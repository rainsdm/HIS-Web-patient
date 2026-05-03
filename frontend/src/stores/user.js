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

    const appointmentProfile = ref(null)

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
            body: JSON.stringify(credentials)
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

        appointmentProfile.value = null;

        if (!silent) {
            router.push('/login');
        }
    }
    
    async function loadAppointmentProfile() {
        if (appointmentProfile.value) {
            console.log('档案信息已存在，从 Pinia 缓存加载。');
            return;
        }

        console.log('首次加载，正在从后端获取档案信息...');
        const profileData = await request('/patient/appointment-profile', { method: 'GET' });
        appointmentProfile.value = profileData;
    }

    return { 
        token, 
        uid, 
        name, 
        isLoggedIn, 
        appointmentProfile,
        login, 
        register, 
        logout, 
        loadAppointmentProfile 
    }
})