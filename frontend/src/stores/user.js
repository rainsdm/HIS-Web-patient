import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '@/utils/api' 

export const useUserStore = defineStore('user', () => {
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

    async function login(credentials) {
        const resultData = await request('/auth/patient/login', {
            method: 'POST',
            body: JSON.stringify(credentials) // 直接将接收到的对象序列化
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

    function logout(silent = false) {
        token.value = null;
        uid.value = null;
        name.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('name');
        router.push('/login');
    }

    async function fetchAppointmentProfile() {
        return await request('/patient/appointment-profile', { method: 'GET' });
    }

    return { token, uid, name, isLoggedIn, login, register, logout, fetchAppointmentProfile }
})