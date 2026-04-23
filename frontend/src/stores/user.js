// 文件路径: src/stores/user.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '@/utils/api' 
// *** 改动：不再需要引入 useModalStore ***

export const useUserStore = defineStore('user', () => {
    // --- State, Getters, setLoginState, login, register (这些都保持不变) ---
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
     * ✨ [最终版] 登出函数
     * 移除了所有弹窗逻辑，变为一个即时、无阻碍的操作。
     * “silent”参数不再需要，但保留它不会导致任何问题，函数行为保持一致。
     */
    function logout(silent = false) {
        // 直接执行登出操作
        token.value = null;
        uid.value = null;
        name.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('name');
        router.push('/login'); // 重定向到登录页
    }

    async function fetchAppointmentProfile() {
        return await request('/patient/appointment-profile', { method: 'GET' });
    }

    return { token, uid, name, isLoggedIn, login, register, logout, fetchAppointmentProfile }
})