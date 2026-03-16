import { createRouter, createWebHistory } from 'vue-router'

const whiteList = ['/login', '/register', '/home']

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '身份核验' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '建立就诊档案' },
    beforeEnter: (to, from, next) => {
            alert(`【${to.meta.title}】模块正在快马加鞭开发中，敬请期待！`);
            next(false); // 传入 false 会中断当前的路由跳转，停留在原页面
    }
  },
  {
    // 嵌套路由，这里可以利用组件进行嵌套，而不必再使用路径嵌套。
    path: '/',
    component: () => import('@/views/home/index.vue'),
    redirect: '/home', // 默认进入首页
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/MainPage.vue'),
        meta: { title: '医院首页' } // 医院首页与默认首页相同，且不需要认证
      },
      {
        path: 'appointment',
        name: 'Appointment',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '门诊挂号', requiresAuth: true },beforeEnter: (to, from, next) => {
            alert(`【${to.meta.title}】模块正在快马加鞭开发中，敬请期待！`);
            next(false); // 传入 false 会中断当前的路由跳转，停留在原页面
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '电子档案', requiresAuth: true },
        beforeEnter: (to, from, next) => {
            alert(`【${to.meta.title}】模块正在快马加鞭开发中，敬请期待！`);
            next(false); // 传入 false 会中断当前的路由跳转，停留在原页面
        }
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