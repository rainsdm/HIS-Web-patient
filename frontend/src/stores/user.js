import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// 1. 引入新建的 request 函数
import { request } from '@/utils/api' 

export const useUserStore = defineStore('user', () => {
    // --- State, Getters (保持不变) ---
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
        // 2. 使用 request 函数代替 fetch
        const resultData = await request('/auth/patient/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        setLoginState(resultData);
    }
    
    /**
     * 注册并直接登录
     * @param {object} form - 包含注册信息的表单对象
     */
    async function register(form) {
        // 3. 使用 request 函数代替 fetch
        const resultData = await request('/auth/patient/register', {
            method: 'POST',
            body: JSON.stringify(form)
        });
        setLoginState(resultData);
    }

    /**
     * 4. ✨ 改造 logout 方法
     * @param {boolean} silent - 如果为 true，则不显示确认框直接登出
     */
    function logout(silent = false) {
        const performLogout = () => {
            token.value = null
            uid.value = null
            name.value = null
            localStorage.removeItem('token')
            localStorage.removeItem('uid')
            localStorage.removeItem('name')
            router.push('/login')
        };
        
        if (silent) {
            performLogout();
        } else {
            if (confirm('您确定要退出登录吗？')) {
                performLogout();
            }
        }
    }

    async function fetchAppointmentProfile() {
        // 5. 使用 request 函数代替 fetch
        return await request('/api/patient/appointment-profile', { method: 'GET' });
    }

    return { token, uid, name, isLoggedIn, login, register, logout, fetchAppointmentProfile }
})