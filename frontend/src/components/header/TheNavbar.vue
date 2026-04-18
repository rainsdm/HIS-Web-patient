<template>
    <div class="nav-links">
        <RouterLink to="/home" class="nav-item">首页门户</RouterLink>
        <RouterLink to="/appointment" class="nav-item">预约挂号</RouterLink>
        
        <!-- 根据登录状态动态显示链接 -->
        <template v-if="userStore.isLoggedIn">
            <RouterLink to="/profile" class="nav-item">个人中心</RouterLink>
            <a href="#" @click.prevent="handleLogout" class="nav-item">退出登录</a>
        </template>
        <template v-else>
            <RouterLink to="/login" class="nav-item">登录/建档</RouterLink>
        </template>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

// 获取 Pinia user store 的实例
const userStore = useUserStore()

const handleLogout = () => {
    // 使用 confirm 提供一个简单的确认对话框，给用户一个反悔的机会
    if (confirm('您确定要退出登录吗？')) {
        userStore.logout()
    }
}
</script>

<style scoped>
@reference "@/style.css";

.nav-links {
    @apply flex flex-wrap justify-center items-center gap-[10px] md:gap-6 mt-[10px] pb-[10px] md:mt-0 md:pb-0;
}

.nav-item {
    @apply text-(--text-main) font-bold transition-colors duration-200 relative py-1 text-[14px] md:text-[16px];
}

/* 鼠标悬停状态 */
.nav-item:hover {
    @apply text-(--primary);
}

/* 路由激活状态（当前所处页面） */
.router-link-active {
    @apply text-(--primary);
}

/* 当前所处页面的底部指示条 */
.router-link-active::after {
    content: "";
    @apply absolute left-0 bottom-0 w-full h-[2px] bg-(--primary) rounded;
}
</style>