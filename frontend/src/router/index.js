// 文件路径: src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast' // *** 改动(1): 引入 toast store ***
import { isTokenExpired } from '@/utils/api' 

const routes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/MainPage.vue'),
        meta: { title: '医院首页' }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: { title: '建立就诊档案' }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '身份核验' }
      },
      {
        path: 'appointment',
        name: 'Appointment',
        component: () => import('@/views/Appointment.vue'),
        meta: { title: '门诊挂号', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: { title: '电子档案', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 核心的全局路由守卫
router.beforeEach((to, from, next) => {
  // 必须在守卫函数内部获取 store 实例
  const userStore = useUserStore()
  const toastStore = useToastStore() // *** 改动(2): 获取 toast store 实例 ***

  // Token 过期检查 (保持不变)
  if (isTokenExpired(userStore.token)) {
    if (userStore.isLoggedIn) {
      console.log('检测到 Token 已过期，执行静默登出。');
      userStore.logout(true);
    }
  }

  // 检查目标路由是否需要认证
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // *** 改动(3): 在重定向前，显示提示信息 ***
    toastStore.show('请登录后再进入', 'error');

    console.log('访问被拦截，跳转至登录页。')
    next({ name: 'Login' })
  } else {
    // 正常放行
    next()
  }
})

export default router