<template>
    <div class="nav-links">
        <RouterLink to="/home" class="nav-item">首页门户</RouterLink>
        <RouterLink to="/appointment" class="nav-item">预约挂号</RouterLink>
        <RouterLink to="/profile" class="nav-item">个人中心</RouterLink>
        <RouterLink to="/login" class="nav-item">登录/建档</RouterLink>
    </div>
</template>

<style scoped>
@reference "@/style.css";
.nav-links {
    /* 使用 flex 保证桌面端横向排列，gap-6 提供 24px 的项间距 */
    @apply flex items-center gap-6;
}

.nav-item {
    /* 1. 显式设为深咖色，覆盖全局 a 标签的 primary 颜色 */
    /* 2. 增加 py-1 和 relative，为底部的激活状态横线预留空间 */
    @apply text-(--text-main) font-bold transition-colors duration-200 relative py-1;
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