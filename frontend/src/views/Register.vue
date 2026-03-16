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
                        <button class="btn-primary" @click="openModal">提交并建立档案</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-overlay" v-if="showModal">
            <div class="modal-box">
                <div class="card-title border-none pb-0">完善安全信息</div>
                <p class="modal-tips">为了确保您的就诊隐私与电子报告安全，请绑定个人邮箱并设定独立密码。</p>
                
                <div class="form-item">
                    <label class="form-label">个人邮箱地址</label>
                    <input class="form-input" type="text" v-model="bindEmail" placeholder="example@mail.com">
                    <div class="error-msg" v-show="emailError">请输入有效的邮箱格式</div>
                </div>

                <div class="form-item">
                    <label class="form-label">设定独立密码</label>
                    <input class="form-input" type="password" v-model="bindPwd" placeholder="请输入新密码">
                    <ul class="password-rules">
                        <li>长度要求 8 - 16 位</li>
                        <li>必须同时包含大写字母与小写字母</li>
                        <li>必须包含数字</li>
                        <li>必须包含特殊字符</li>
                    </ul>
                    <div class="error-msg" v-show="pwdError">密码不符合复杂度要求，请检查全部包含项</div>
                </div>

                <button class="btn-primary w-full mt-2" @click="validateAndBind">确认绑定并开启就医</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const insuranceType = ref('self')
const showModal = ref(false) // 控制弹窗显隐的响应式变量
const bindEmail = ref('')
const bindPwd = ref('')
const emailError = ref(false)
const pwdError = ref(false)

// 基础跳转
const goLogin = () => {
    router.push('/login')
}

// 打开弹窗：修正点，必须使用 .value
const openModal = () => {
    showModal.value = true 
}

// 验证并提交 (移植 test5.html 的逻辑)
const validateAndBind = () => {
    // 基础邮箱正则
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // 密码验证规则：长度8-16，至少包含大写、小写、数字和特殊字符
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/

    let isValid = true

    // 验证邮箱
    if (!emailRegex.test(bindEmail.value)) {
        emailError.value = true
        isValid = false
    } else {
        emailError.value = false
    }

    // 验证密码
    if (!pwdRegex.test(bindPwd.value)) {
        pwdError.value = true
        isValid = false
    } else {
        pwdError.value = false
    }

    if (isValid) {
        alert('账号安全信息绑定成功！将为您跳转至挂号页面。')
        showModal.value = false
        // 验证通过后跳转到预约挂号页面
        router.push('/appointment')
    }
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
    @apply flex gap-[20px];
}

/* === 侧边步骤条 === */
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

/* === 主体表单区 === */
.form-content {
    @apply flex-grow;
}
.form-row {
    @apply flex gap-[16px];
}
.form-item {
    @apply flex-1 mb-[16px];
}
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

/* === 模态框 (Modal) 样式 === */
.modal-overlay {
    @apply fixed inset-0 flex justify-center items-center z-50 p-5;
    /* 半透明蒙层 */
    background-color: rgba(46, 42, 40, 0.6);
}
.modal-box {
    @apply bg-(--surface) rounded-lg max-w-[450px] w-full p-6 shadow-xl overflow-y-auto max-h-[90vh];
}
.modal-tips {
    @apply text-[14px] text-(--text-sub) mb-5;
}
.password-rules {
    @apply text-[12px] text-(--text-sub) mt-2 pl-[18px] leading-[1.5] list-disc;
}
.error-msg {
    @apply text-(--danger) text-[12px] mt-1;
}

/* === 按钮补齐 === */
.btn-outline {
    @apply inline-flex items-center justify-center cursor-pointer rounded px-[16px] py-[8px] text-[14px] transition-opacity duration-200;
    @apply bg-transparent border border-solid border-(--primary) text-(--primary);
}
.btn-outline:hover {
    @apply opacity-80;
}
</style>