<!-- 文件路径: src/views/Register.vue -->
<template>
  <div class="register-wrapper flex justify-center items-center py-10">
    <Card title="建立就诊档案" class="w-full max-w-lg">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input label="姓名" placeholder="请输入真实姓名" v-model="form.patientName" />
        <Input label="身份证号" placeholder="请输入18位身份证号" v-model="form.identityCard" />
        <Input label="邮箱" type="email" placeholder="用于登录和接收通知" v-model="form.email" />
        <Input label="设置密码" type="password" placeholder="请设置登录密码" v-model="form.password" />
        <Button type="submit" class="w-full">确认建档</Button>
      </form>
       <div class="mt-4 text-center text-sm text-(--text-sub)">
        已有档案？
        <RouterLink to="/login" class="text-(--primary) hover:underline">立即登录</RouterLink>
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

const form = reactive({
  patientName: '',
  identityCard: '',
  email: '',
  password: ''
});

const handleSubmit = async () => {
  try {
    await userStore.register(form);
    toastStore.show('档案建立成功，您已自动登录！', 'success'); // *** 改动：替换 alert ***
    router.push('/appointment');
  } catch (error) {
    console.error('建档失败:', error);
    toastStore.show('未能完成建档: ' + error.message, 'error'); // *** 改动：替换 alert ***
  }
};
</script>