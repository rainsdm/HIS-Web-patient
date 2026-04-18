import { createRouter, createWebHistory } from 'vue-router'
// 获取登录状态
import { useUserStore } from '@/stores/user'
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
  // 必须在守卫函数内部获取 store 实例，以确保 Pinia 已被挂载
  const userStore = useUserStore()

  // 增加对Token过期的主动检查
  if (isTokenExpired(userStore.token)) {
    // 如果 token 已过期
    if (userStore.isLoggedIn) {
      // 并且 Pinia 的状态还是“登录”，说明是刚过期，需要强制登出
      console.log('检测到 Token 已过期，执行静默登出。');
      userStore.logout(true);
    }
  }

  // 检查目标路由(to)是否标记了 requiresAuth
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 如果页面需要登录，但用户当前状态是“未登录”
    console.log('访问被拦截，跳转至登录页。')
    // 则拦截访问，并重定向到登录页
    next({ name: 'Login' })
  } else {
    // 如果页面不需要登录，或者用户已经登录，则正常放行
    next()
  }
})

export default router