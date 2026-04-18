// 文件路径: src/stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '@/utils/api' 
import { useModalStore } from '@/stores/modal' // *** 改动：引入 modal store ***

export const useUserStore = defineStore('user', () => {
    // ... state, getters, setLoginState, login, register (这些都保持不变) ...
    const token = ref(localStorage.getItem('token') || null)
    const uid = ref(localStorage.getItem('uid') || null)
    const name = ref(localStorage.getItem('name') || null)
    const router = useRouter()
    const isLoggedIn = computed(() => !!token.value)
    function setLoginState(userData) {
        token.value = userData.token
        uid.value = userData.uid
        name.value = userData.patientName
        localStorage.setItem('token', userData.token)
        localStorage.setItem('uid', userData.uid)
        localStorage.setItem('name', userData.patientName)
    }
    async function login(email, password) {
        const resultData = await request('/auth/patient/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        setLoginState(resultData);
    }
    async function register(form) {
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
    async function logout(silent = false) { // *** 改动：将函数改为 async ***
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
            // *** 改动：使用新的 Modal 系统代替 confirm ***
            const modalStore = useModalStore();
            const confirmed = await modalStore.show({
                title: '退出登录',
                message: '您确定要退出当前账号吗？'
            });

            if (confirmed) {
                performLogout();
            }
        }
    }

    async function fetchAppointmentProfile() {
        return await request('/api/patient/appointment-profile', { method: 'GET' });
    }

    return { token, uid, name, isLoggedIn, login, register, logout, fetchAppointmentProfile }
})