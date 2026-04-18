<!-- 文件路径: src/views/Login.vue -->
<template>
  <div class="login-wrapper flex justify-center items-center py-10">
    <Card title="登录/注册" class="w-full max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <Input label="邮箱" type="email" placeholder="请输入您的邮箱" v-model="loginForm.email" />
        <Input label="密码" type="password" placeholder="请输入您的密码" v-model="loginForm.password" />
        <Button type="submit" class="w-full">登 录</Button>
      </form>
      <div class="mt-4 text-center text-sm text-(--text-sub)">
        还没有账号？
        <RouterLink to="/register" class="text-(--primary) hover:underline">立即建立档案</RouterLink>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast'; // *** 改动：引入 toast store ***
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore(); // *** 改动：获取 toast store 实例 ***

const loginForm = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    toastStore.show('请输入邮箱和密码。', 'error'); // *** 改动：替换 alert ***
    return;
  }
  
  try {
    await userStore.login(loginForm.email, loginForm.password);
    toastStore.show('登录成功！', 'success'); // *** 改动：替换 alert ***
    router.push('/profile');
  } catch (error) {
    console.error("登录失败:", error);
    toastStore.show('登录失败：' + error.message, 'error'); // *** 改动：替换 alert ***
  }
};
</script>