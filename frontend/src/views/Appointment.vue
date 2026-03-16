<template>
    <div class="appointment-wrapper">
        <div class="breadcrumb">当前位置：首页 > 门诊服务 > 预约挂号</div>

        <div class="appointment-layout">
            <div class="step-sidebar">
                <div class="step-item step-done">
                    患者建档<br>
                    <span class="step-desc">(已完成)</span>
                </div>
                <div class="step-item step-active">
                    门诊排班预约<br>
                    <span class="step-desc">(当前环节)</span>
                </div>
                <div class="step-item">
                    挂号费支付<br>
                    <span class="step-desc">(待办理)</span>
                </div>
                <div class="step-item step-last">
                    候诊与报到<br>
                    <span class="step-desc">(待办理)</span>
                </div>
            </div>

            <div class="appointment-content">
                <div class="card patient-info-box">
                    <div class="card-title no-border mb-2">就诊档案信息</div>
                    <div class="info-row">
                        就诊人：<strong class="text-main">王五</strong> 
                        <span class="text-sub ml-2">(身份证: 110***********1234)</span>
                    </div>
                    <div class="status-tag success-text mt-1">✔ 已绑定本市职工医保</div>
                </div>

                <div class="card">
                    <div class="card-title">请选择就诊科室与日期</div>
                    
                    <div class="filter-row">
                        <div class="form-item">
                            <select class="form-input">
                                <option>普通内科</option>
                                <option>心血管内科</option>
                                <option>呼吸内科</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <input class="form-input" type="date" value="2026-03-16">
                        </div>
                    </div>

                    <div class="card-title mt-6">号源列表</div>
                    
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>医师</th>
                                    <th>诊室</th>
                                    <th>余号量</th>
                                    <th>出诊时段</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>张三 (主任医师)</td>
                                    <td>诊室101</td>
                                    <td class="success-text font-bold">30</td>
                                    <td>08:00 - 12:00</td>
                                    <td>
                                        <button class="btn-primary btn-sm" @click="handleReserve">挂号预约</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>李四 (主治医师)</td>
                                    <td>诊室102</td>
                                    <td class="danger-text font-bold">0</td>
                                    <td>14:00 - 18:00</td>
                                    <td>
                                        <button class="btn-disabled btn-sm" disabled>号源已满</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟挂号预约操作
const handleReserve = () => {
    alert('正在进入挂号费支付环节...')
    // 未来可跳转至支付页面：router.push('/payment')
}
</script>

<style scoped>
@reference "@/style.css";

/* === 容器与布局 === */
.appointment-wrapper {
    @apply w-full;
}
.breadcrumb {
    @apply mb-4 text-[14px] text-(--text-sub);
}
.appointment-layout {
    @apply flex gap-[20px];
}

/* === 侧边步骤条 (抽离自 Register.vue 经验) === */
.step-sidebar {
    @apply w-[220px] shrink-0;
}
.step-item {
    @apply pl-[20px] border-l-2 border-solid border-(--border) mb-[20px] relative text-(--text-sub);
}
.step-item::before {
    content: '';
    @apply absolute left-[-6px] top-0 w-[10px] h-[10px] rounded-full bg-(--border);
}

/* 步骤条不同状态 */
.step-done {
    @apply border-l-(--success) text-(--text-sub);
}
.step-done::before {
    @apply bg-(--success);
}
.step-active {
    @apply border-l-(--primary) text-(--primary) font-bold;
}
.step-active::before {
    @apply bg-(--primary);
}
.step-desc {
    @apply text-[12px] font-normal;
}
.step-active .step-desc {
    @apply text-(--primary);
}
.step-last {
    @apply border-l-0;
}

/* === 主内容区样式 === */
.appointment-content {
    @apply flex-grow;
}

/* 患者信息卡片特化 */
.patient-info-box {
    @apply bg-(--bg-color);
}
.info-row {
    @apply text-[14px];
}
.text-main {
    @apply text-(--text-main);
}
.no-border {
    @apply border-none;
}

/* 筛选行 */
.filter-row {
    @apply flex gap-[16px] flex-wrap;
}
.form-item {
    @apply flex-1 min-w-[200px];
}

/* === 表格样式 === */
.table-container {
    @apply w-full overflow-x-auto;
}
.data-table {
    @apply w-full border-collapse mt-4 min-w-[600px];
}
.data-table th, .data-table td {
    @apply border border-solid border-(--border) p-3 text-left text-[14px];
}
.data-table th {
    @apply bg-(--bg-color) text-(--text-sub) font-normal;
}

/* === 辅助类 === */
.success-text {
    @apply text-(--success);
}
.danger-text {
    @apply text-(--danger);
}
.btn-sm {
    @apply py-1 px-3 text-[12px];
}
.btn-disabled {
    @apply bg-(--border) text-(--text-sub) cursor-not-allowed rounded;
}
</style>