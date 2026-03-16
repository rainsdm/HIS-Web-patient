<template>
    <div class="profile-wrapper">
        <div class="breadcrumb">当前位置：首页 > 个人中心</div>

        <div class="card profile-info-section">
            <div class="card-title">个人档案</div>
            <div class="info-content">
                <div class="info-item">
                    <span class="label">姓名：</span>
                    <span class="value font-bold">王五</span>
                </div>
                <div class="info-item">
                    <span class="label">证件号码：</span>
                    <span class="value">110***********1234</span>
                </div>
                <div class="info-item">
                    <span class="label">联系电话：</span>
                    <span class="value">138****5678</span>
                </div>
                <div class="info-item">
                    <span class="label">医疗保障：</span>
                    <span class="value text-success">✔ 已绑定本市职工医保</span>
                </div>
            </div>
        </div>

        <div class="card record-section">
            <div class="card-title">我的挂号记录</div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>就诊日期</th>
                            <th>科室与医师</th>
                            <th>就诊序号</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2026-03-10</td>
                            <td>内科 - 张三</td>
                            <td>A015</td>
                            <td><span class="status-text success-text">已就诊</span></td>
                        </tr>
                        <tr>
                            <td>2026-03-16</td>
                            <td>内科 - 张三</td>
                            <td>待分配</td>
                            <td><span class="status-text primary-text">已预约，待报到</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * 个人中心组件
 * 主要负责展示用户档案及历史挂号记录
 */
</script>

<style scoped>
@reference "@/style.css";

/* === 容器与通用布局 === */
.profile-wrapper {
    @apply w-full;
}

.breadcrumb {
    @apply mb-4 text-[14px] text-(--text-sub);
}

/* === 个人信息区域 === */
.info-content {
    @apply space-y-3;
}

.info-item {
    @apply flex items-center text-[15px];
}

.info-item .label {
    @apply w-[100px] text-(--text-sub) shrink-0;
}

.info-item .value {
    @apply text-(--text-main);
}

/* === 挂号记录表格区域 === */
.table-container {
    @apply w-full overflow-x-auto;
}

.data-table {
    @apply w-full border-collapse mt-2 min-w-[600px];
}

.data-table th, .data-table td {
    @apply border border-solid border-(--border) p-3 text-left text-[14px];
}

.data-table th {
    @apply bg-(--bg-color) text-(--text-sub) font-normal;
}

/* === 状态修饰类 === */
.status-text {
    @apply font-bold;
}

.success-text {
    @apply text-(--success);
}

.primary-text {
    @apply text-(--primary);
}

.text-success {
    @apply text-(--success);
}
</style>