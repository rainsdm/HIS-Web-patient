<template>
    <div class="home-container">
        <div class="card notice-box">
            <h3>医院公告</h3>
            <p class="notice-text">为缩短您的等候时间，建议优先使用线上预约挂号系统进行排班取号，请带好身份证件就医。</p>
        </div>
            
        <h3 class="module-title">快捷业务办理</h3>
        
        <div class="quick-nav-list">
            <div class="card nav-item" @click="goAppointment">
                <div class="nav-icon icon-primary">📅</div>
                <h4>预约挂号</h4>
                <span class="nav-desc">在线查排班取号</span>
            </div>
            
            <div class="card nav-item">
                <div class="nav-icon icon-success">💳</div>
                <h4>门诊缴费</h4>
                <span class="nav-desc">自助清单结算</span>
            </div>
            
            <div class="card nav-item">
                <div class="nav-icon icon-primary">📄</div>
                <h4>报告查询</h4>
                <span class="nav-desc">检验与影像结果</span>
            </div>
        </div>

        <div class="card">
            <div class="card-title">重点出诊排班速览</div>
            <ul>
                <li class="list-item">内科：张三 (主任医师) - 今日上午出诊</li>
                <li class="list-item">外科：李四 (主治医师) - 今日下午出诊</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 处理卡片点击跳转
const goAppointment = () => {
    router.push('/appointment')
}
</script>

<style scoped>
@reference "@/style.css";

/* === 容器层 === */
.home-container {
    @apply w-full;
}

/* === 公告模块 === */
.notice-box {
    @apply bg-(--primary) text-(--surface);
}
.notice-text {
    @apply mt-2 opacity-90;
}

/* === 标题与布局 === */
.module-title {
    @apply mb-4 font-bold text-[18px];
}
.quick-nav-list {
    @apply flex flex-wrap gap-4 mb-[30px];
}

/* === 快捷操作卡片 === */
.nav-item {
    /* 布局与对齐 */
    @apply flex-1 min-w-[100px] text-center;
    
    /* 交互与动画 */
    @apply cursor-pointer transition-opacity duration-200;
    
    /* 悬停状态 */
    @apply hover:opacity-80;
}
.nav-icon {
    @apply text-[24px] mb-2;
}
.icon-primary {
    @apply text-(--primary);
}
.icon-success {
    @apply text-(--success);
}
.nav-desc {
    @apply text-[12px] text-(--text-sub);
}

/* === 列表排版 === */
.list-item {
    @apply mb-2;
}
</style>