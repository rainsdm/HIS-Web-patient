<template>
  <div class="login-container flex justify-center items-center py-20">
    <Card title="患者服务平台登录" class="w-[400px]">
      <div class="space-y-4">
        <Input 
          v-model="loginForm.account" 
          label="账号/手机号/就诊卡号" 
          placeholder="请输入您的账号" 
        />
        
        <Input 
          v-model="loginForm.password" 
          type="password" 
          label="登录密码" 
          placeholder="请输入密码" 
        />
        
        <Button class="w-full py-2.5 mt-2" @click="handleLogin">
          立即登录
        </Button>
        
        <div class="flex justify-between text-[13px] text-(--primary) mt-2 px-1">
          <span class="cursor-pointer hover:underline transition-all">忘记密码？</span>
          <span 
            class="cursor-pointer hover:underline transition-all font-bold" 
            @click="$router.push('/register')"
          >
            立即注册建档
          </span>
        </div>

        <div class="text-center mt-6 pt-4 border-t border-dashed border-(--border)">
          <span 
            class="text-[14px] text-(--text-sub) cursor-pointer hover:text-(--primary) transition-colors" 
            @click="$router.push('/main')"
          >
            ← 回到首页工作台
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// 导入无前缀的基础组件
import Card from '@/components/base/Card.vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'

const router = useRouter()

// 表单数据绑定
const loginForm = reactive({
  account: '',
  password: ''
})

// 登录处理逻辑
const handleLogin = () => {
  console.log('提交的登录信息：', loginForm)
  // 此处预留后端 API 对接位置
  // 模拟验证通过后跳转回首页
  router.push('/main')
}
</script>

<style scoped>
@reference "@/style.css";

/* 容器高度占满视口，确保卡片垂直居中 */
.login-container {
  min-height: calc(100vh - 200px);
}
</style>