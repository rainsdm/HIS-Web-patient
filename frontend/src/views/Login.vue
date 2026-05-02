<!-- 文件路径: src/views/Login.vue -->
<template>
  <div class="login-wrapper flex justify-center items-center py-20">
    <Card title="登录就诊档案" class="w-full max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input 
          label="邮箱" 
          type="email" 
          placeholder="请输入注册时使用的邮箱" 
          v-model="form.email"
          @input="clearError"
        />
        <Input 
          label="密码" 
          type="password" 
          placeholder="请输入密码" 
          v-model="form.password"
          @input="clearError"
        />
        
        <!-- 登录错误信息展示区 -->
        <div v-if="errorMessage" class="error-message text-center text-sm text-(--danger) p-2 bg-(--danger-bg) rounded">
          {{ errorMessage }}
        </div>

        <Button type="submit" class="w-full" :disabled="isLoading">
          {{ isLoading ? '正在登录...' : '立即登录' }}
        </Button>
      </form>

      <div class="mt-4 text-center text-sm text-(--text-sub)">
        还没有档案？
        <RouterLink to="/register" class="text-(--primary) hover:underline">立即建立</RouterLink>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const userStore = useUserStore();
const toastStore = useToastStore();

const form = reactive({
  email: '',
  password: ''
});

// 用于在页面上显示登录相关的错误，例如“邮箱或密码错误”
const errorMessage = ref('');
// 用于控制按钮的禁用状态，防止重复提交
const isLoading = ref(false);

/**
 * 当用户重新输入时，清除错误信息，提供更好的交互体验。
 */
const clearError = () => {
  if (errorMessage.value) {
    errorMessage.value = '';
  }
};

/**
 * 校验登录表单。
 * 根据测试用例 LOGIN-VALID-EM-001 和 LOGIN-VALID-PW-001,
 * 在前端进行基本的格式和非空校验。
 */
const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    errorMessage.value = '请输入有效的邮箱地址。';
    return false;
  }
  if (!form.password) {
    errorMessage.value = '请输入您的密码。';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (isLoading.value) return;
  clearError();

  // 步骤1：运行前端校验，拦截基本错误
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  try {
    // 步骤2：调用 store 中的登录 action
    await userStore.login(form);
    toastStore.show('登录成功！欢迎回来。', 'success');
    router.push('/appointment');
  } catch (error) {
    console.error('登录失败:', error);
    
    // 步骤3：处理后端返回的错误
    // 根据测试用例 LOGIN-AUTH-PW-001 和 LOGIN-AUTH-EM-001,
    // 对于 401 错误，显示统一的、模糊的提示
    if (error.response?.status === 401) {
      errorMessage.value = '邮箱或密码错误，请检查后重试。';
    } else {
      // 对于其他错误（如网络问题、服务器500），使用全局 Toast 提示
      toastStore.show('登录时遇到问题: ' + (error.message || '未知错误'), 'error');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@reference "@/style.css";
</style>