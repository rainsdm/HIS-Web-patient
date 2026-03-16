<template>
    <div class="register-wrapper">
        <div class="breadcrumb">当前位置：首页 > 门诊服务 > 患者建档</div>
        
        <div class="register-layout">
            <div class="step-sidebar">
                <div class="step-item step-active">
                    患者建档<br>
                    <span class="step-desc">(当前环节)</span>
                </div>
                <div class="step-item">
                    门诊排班预约<br>
                    <span class="step-desc">(待办理)</span>
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

            <div class="form-content">
                <div class="card">
                    <div class="card-title">填写基本信息</div>
                    
                    <div class="form-row">
                        <div class="form-item">
                            <label class="form-label">患者姓名</label>
                            <input class="form-input" type="text" placeholder="请输入真实姓名">
                        </div>
                        <div class="form-item">
                            <label class="form-label">性别</label>
                            <div class="radio-group">
                                <label class="radio-label"><input type="radio" name="gender" value="male" checked> 男</label>
                                <label class="radio-label"><input type="radio" name="gender" value="female"> 女</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-item">
                            <label class="form-label">身份证号</label>
                            <input class="form-input" type="text" placeholder="请输入18位身份证号码">
                        </div>
                        <div class="form-item">
                            <label class="form-label">出生日期</label>
                            <input class="form-input" type="date">
                        </div>
                    </div>

                    <div class="form-item mt-4">
                        <label class="form-label">医疗保障类型</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" value="self" v-model="insuranceType"> 彻底自费
                            </label>
                            <label class="radio-label">
                                <input type="radio" value="medicare" v-model="insuranceType"> 医保卡/社保卡
                            </label>
                        </div>
                    </div>

                    <div class="form-item" v-show="insuranceType === 'medicare'">
                        <label class="form-label">医保卡号/社保卡号</label>
                        <input class="form-input" type="text" placeholder="请输入卡号以便门诊统筹结算">
                    </div>
                    
                    <div class="action-footer">
                        <button class="btn-outline mr-3" @click="goLogin">返回登录</button>
                        <button class="btn-primary" @click="submitRegister">提交并建立档案</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const insuranceType = ref('self')

const goLogin = () => {
    router.push('/login')
}

const submitRegister = () => {
    alert('档案信息已记录，即将进行安全信息绑定...')
}
</script>

<style scoped>
@reference "@/style.css";

/* === 容器层 === */
.register-wrapper {
    @apply w-full;
}

/* === 面包屑与布局 === */
.breadcrumb {
    @apply mb-4 text-[14px] text-(--text-sub);
}
.register-layout {
    /* 恢复纯桌面端 Flex 并排布局 */
    @apply flex gap-[20px];
}

/* === 侧边步骤条 === */
.step-sidebar {
    /* 固定左侧宽度，禁止缩放 */
    @apply w-[220px] shrink-0;
}
.step-item {
    /* 恢复原汁原味的左侧边框和相对定位 */
    @apply pl-[20px] border-l-2 border-solid border-(--border) mb-[20px] relative text-(--text-sub);
}

/* 步骤条圆点 */
.step-item::before {
    content: '';
    /* 绝对定位到边框线上 */
    @apply absolute left-[-6px] top-0 w-[10px] h-[10px] rounded-full bg-(--border);
}

/* 步骤条激活状态 */
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
/* 最后一项取消边框 */
.step-last {
    @apply border-l-0;
}

/* === 主体表单区 === */
.form-content {
    /* 占据剩余全部空间 */
    @apply flex-grow;
}
.form-row {
    @apply flex gap-[16px];
}
.form-item {
    @apply flex-1 mb-[16px];
}

/* === 原生控件美化 === */
.radio-group {
    @apply flex gap-[16px] items-center py-[10px];
}
.radio-label {
    @apply inline-flex items-center text-(--text-main) cursor-pointer;
}
.radio-label input[type="radio"] {
    @apply mr-[6px];
}

/* === 底部操作区 === */
.action-footer {
    @apply mt-[30px] pt-[20px] border-t border-solid border-(--border) text-right;
}

.btn-outline {
    @apply inline-flex items-center justify-center cursor-pointer rounded px-[16px] py-[8px] text-[14px] transition-opacity duration-200;
    @apply bg-transparent border border-solid border-(--primary) text-(--primary);
}
.btn-outline:hover {
    @apply opacity-80;
}
</style>