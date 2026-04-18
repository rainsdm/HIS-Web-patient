<template>
  <div class="register-wrapper">
    <div class="breadcrumb mb-4 text-[14px] text-(--text-sub)">当前位置：首页 > 门诊服务 > 患者建档</div>

    <div class="register-layout flex flex-col gap-5">
      <StepSidebar :steps="steps" :currentStep="0" />

      <div class="form-content w-full">
        <Card title="填写基本信息">
          <form @submit.prevent="handleOpenModal">
            <div class="form-row flex flex-col md:flex-row gap-0 md:gap-4 mb-4">
              <div class="field-wrapper flex-1 mb-4 md:mb-0">
                <label class="block text-[14px] mb-1 text-(--text-sub)">患者姓名</label>
                <input v-model="form.name" type="text" placeholder="请输入真实姓名" class="form-input w-full" required />
              </div>
            </div>

            <div class="form-row flex flex-col md:flex-row gap-0 md:gap-4 mb-4">
              <div class="field-wrapper flex-1 mb-4 md:mb-0">
                <label class="block text-[14px] mb-1 text-(--text-sub)">身份证号</label>
                <input v-model="form.identityCard" type="text" placeholder="请输入18位身份证号码" class="form-input w-full" required pattern="^\d{17}[\dXx]$" title="请输入有效的18位身份证号码" />
              </div>
            </div>

            <div class="action-footer mt-7 pt-5 border-t border-solid border-(--border) text-right">
              <a href="javascript:void(0)" class="mr-5 text-[14px] text-(--text-sub) hover:text-(--primary) transition-colors" @click.prevent="$router.push('/login')">返回登录</a>
              <Button type="submit">提交并建立档案</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay fixed inset-0 bg-[rgba(46,42,40,0.6)] flex items-center justify-center z-[1000] p-5">
      <Card title="完善安全信息" noTitleBorder class="w-full max-w-[450px] mb-0 max-h-[90vh] overflow-y-auto shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        <form @submit.prevent="register">
          <p class="text-[14px] text-(--text-sub) mb-5">为了确保您的就诊隐私与电子报告安全，请绑定个人邮箱并设定独立密码。</p>

          <div class="form-group mb-4">
            <div class="field-wrapper mb-1">
              <label class="block text-[14px] mb-1 text-(--text-sub)">个人邮箱地址</label>
              <input v-model="form.email" type="email" placeholder="example@mail.com" class="form-input w-full" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="请输入有效的邮箱格式" />
            </div>
          </div>

          <div class="form-group mb-4">
            <div class="field-wrapper mb-1">
              <label class="block text-[14px] mb-1 text-(--text-sub)">设定独立密码</label>
              <input v-model="form.password" type="password" placeholder="请输入新密码" class="form-input w-full" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}" title="密码不符合复杂度要求，请检查全部包含项" />
            </div>
            <ul class="rule-list text-[12px] text-(--text-sub) mt-2 pl-[18px] list-disc leading-relaxed">
              <li>长度要求 8 - 16 位</li>
              <li>必须同时包含大写字母与小写字母</li>
              <li>必须包含数字</li>
              <li>必须包含特殊字符</li>
            </ul>
          </div>

          <Button class="w-full mt-2" type="submit">确认绑定并开启就医</Button>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user' // 1. 引入 user store

import Card from '@/components/base/Card.vue'
import StepSidebar from '@/components/base/StepSidebar.vue'
import Button from '@/components/base/Button.vue'
const router = useRouter()
const userStore = useUserStore() // 2. 获取 store 实例
const showModal = ref(false)

const steps = [
  { title: '患者建档' },
  { title: '门诊排班预约' },
  { title: '挂号费支付' },
  { title: '候诊与报到' }
]
const form = reactive({
  name: '',
  identityCard: '',
  email: '',
  password: ''
})
const handleOpenModal = () => {
  showModal.value = true
}

const register = async () => {
  try {
    // 3. 直接调用 store 的 register Action，传入整个表单数据
    await userStore.register(form)
    
    // 成功分支
    alert('账号安全信息绑定成功！您已自动登录，将为您跳转至挂号页面。')
    showModal.value = false
    router.push('/appointment')
    
  } catch (error) {
    // 失败分支
    console.error('注册环节发生错误:', error)
    alert('未能完成档案建立: ' + error.message)
  }
}
</script>