<template>
    <div class="card login-box">
        <div class="card-title title-center">患者身份核验</div>

        <div class="form-item">
            <label class="form-label">身份证号 / 就诊卡号</label>
            <input class="form-input" type="text" placeholder="请输入证件号码">
        </div>

        <div class="form-item">
            <label class="form-label">登录密码</label>
            <input class="form-input" type="password" placeholder="请输入密码">
        </div>

        <button class="btn-primary submit-btn" @click="handleLogin">确认登录</button>

        <div class="action-links">
            初次就诊？ <RouterLink to="/register">点击此处建立就诊档案</RouterLink><br>
            <RouterLink to="/">回到首页</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 处理登录点击，通过 Vue Router 实现无刷新跳转
const handleLogin = () => {
    router.push('/home')
}
</script>

<style scoped>
@reference "@/style.css";

/* === 容器层 === */
.login-box {
    /* 尺寸限制与居中排版 */
    @apply max-w-[400px] mx-auto mt-[80px];
}

/* === 标题区 === */
.title-center {
    /* 文字排版 */
    @apply text-center;
}

/* === 表单布局 === */
.form-item {
    /* 间距 */
    @apply mb-4;
}

/* === 交互按钮 === */
.submit-btn {
    /* 尺寸与间距 */
    @apply w-full mt-4;
}

/* === 底部操作区 === */
.action-links {
    /* 排版与间距 */
    @apply text-center mt-4;
    
    /* 文字尺寸与颜色 */
    @apply text-[14px] text-(--text-sub);
}
</style>