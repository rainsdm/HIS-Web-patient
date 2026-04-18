import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    // --- State ---
    const token = ref(localStorage.getItem('token') || null)
    const uid = ref(localStorage.getItem('uid') || null)
    const name = ref(localStorage.getItem('name') || null)
    const router = useRouter()

    // --- Getters ---
    const isLoggedIn = computed(() => !!token.value)

    // --- Actions ---

    /**
     * 设置用户登录状态的辅助函数，避免代码重复
     * @param {object} userData - 后端返回的用户数据
     */
    function setLoginState(userData) {
        // 更新 state
        token.value = userData.token
        uid.value = userData.uid
        name.value = userData.patientName

        // 持久化到 localStorage
        localStorage.setItem('token', userData.token)
        localStorage.setItem('uid', userData.uid)
        localStorage.setItem('name', userData.patientName)
    }

    /**
     * 登录
     */
    async function login(email, password) {
        const response = await fetch('http://localhost:8080/auth/patient/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const result = await response.json()
        if (result.code !== 200) {
            throw new Error(result.message || '登录失败')
        }
        setLoginState(result.data) // 使用辅助函数
    }
    
    /**
     * 注册并直接登录
     * @param {object} form - 包含注册信息的表单对象
     */
    async function register(form) {
        const response = await fetch('http://localhost:8080/auth/patient/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!response.ok) {
            throw new Error(`网络通讯失败，状态码：${response.status}`);
        }
        
        const result = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '注册失败');
        }

        // 注册成功后，调用 setLoginState 来同步更新状态，实现“注册即登录”
        setLoginState(result.data); 
    }


    /**
     * 登出
     */
    function logout() {
        token.value = null
        uid.value = null
        name.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('uid')
        localStorage.removeItem('name')
        router.push('/login')
    }

    /**
     * ✨ [新增] 获取用于预约挂号的个人档案信息
     * 这个函数将直接使用 fetch，并自动携带 token
     */
    async function fetchAppointmentProfile() {
        // 如果未登录，则直接抛出错误，避免无效请求
        if (!token.value) {
            throw new Error('用户未登录，无法获取档案');
        }
        const response = await fetch('http://localhost:8080/api/patient/appointment-profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 自动在请求头中附带认证 Token
                'Authorization': `Bearer ${token.value}`
            }
        });
        // 处理网络层错误
        if (!response.ok) {
            throw new Error(`网络请求失败，状态码：${response.status}`);
        }
        const result = await response.json();
        // 处理业务层错误
        if (result.code !== 200) {
            throw new Error(result.message || '获取档案失败');
        }
        // 成功，返回 data 部分
        return result.data;
    }


    return { 
        token, 
        uid, 
        name, 
        isLoggedIn, 
        login, 
        logout, // 别忘了 login 和 logout
        fetchAppointmentProfile // 将新函数导出
    }
})