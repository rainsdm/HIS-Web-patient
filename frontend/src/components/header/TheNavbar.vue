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