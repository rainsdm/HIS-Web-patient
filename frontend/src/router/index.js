import { createRouter, createWebHistory } from 'vue-router'

const whiteList = ['/login', '/register', '/home']

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '身份核验' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    meta: { title: '建立就诊档案' }
  },
  {
    // 嵌套路由，这里可以利用组件进行嵌套，而不必再使用路径嵌套。
    path: '/',
    component: () => import('@/index.vue'),
    redirect: '/home', // 默认进入首页
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '医院首页' }
      },
      {
        path: 'appointment',
        name: 'Appointment',
        component: () => import('@/views/appointment/index.vue'),
        meta: { title: '门诊挂号', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: '电子档案', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 守卫逻辑保持不变...
export default router