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
              <div class="field-wrapper flex-1 mb-4 md:mb-0">
                <label class="block text-[14px] mb-1 text-(--text-sub)">性别</label>
                <div class="flex gap-4 items-center h-[44px]">
                  <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                    <input type="radio" value="male" v-model="form.gender" class="mr-2" required> 男
                  </label>
                  <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                    <input type="radio" value="female" v-model="form.gender" class="mr-2" required> 女
                  </label>
                </div>
              </div>
            </div>

            <div class="form-row flex flex-col md:flex-row gap-0 md:gap-4 mb-4">
              <div class="field-wrapper flex-1 mb-4 md:mb-0">
                <label class="block text-[14px] mb-1 text-(--text-sub)">身份证号</label>
                <input v-model="form.idCard" type="text" placeholder="请输入18位身份证号码" class="form-input w-full" required pattern="^\d{17}[\dXx]$" title="请输入有效的18位身份证号码" />
              </div>
              <div class="field-wrapper flex-1 mb-4 md:mb-0">
                <label class="block text-[14px] mb-1 text-(--text-sub)">出生日期</label>
                <input v-model="form.birthDate" type="date" class="form-input w-full" required />
              </div>
            </div>

            <div class="field-wrapper mb-4 md:mt-4 mt-0">
              <label class="block text-[14px] mb-1 text-(--text-sub)">医疗保障类型</label>
              <div class="flex gap-4 items-center h-[44px]">
                <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                  <input type="radio" value="self" v-model="form.insurance" class="mr-2" required> 彻底自费
                </label>
                <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                  <input type="radio" value="bmiCard" v-model="form.insurance" class="mr-2" required> 医保卡
                </label>
                <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                  <input type="radio" value="siCard" v-model="form.insurance" class="mr-2" required> 社保卡
                </label>
              </div>
            </div>

            <div v-if="form.insurance === 'bmiCard'" class="field-wrapper mb-4">
              <label class="block text-[14px] mb-1 text-(--text-sub)">医保卡号</label>
              <input v-model="form.cardNumber" type="text" placeholder="请输入卡号以便门诊统筹结算" class="form-input w-full" required />
            </div>

            <div v-else-if="form.insurance === 'siCard'" class="field-wrapper mb-4">
              <label class="block text-[14px] mb-1 text-(--text-sub)">社保卡号</label>
              <input v-model="form.cardNumber" type="text" placeholder="请输入卡号以便门诊统筹结算" class="form-input w-full" required />
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

import Card from '@/components/base/Card.vue'
import StepSidebar from '@/components/base/StepSidebar.vue'
import Input from '@/components/base/Input.vue'
import Button from '@/components/base/Button.vue'

const router = useRouter()
const showModal = ref(false)

const steps = [
  { title: '患者建档' },
  { title: '门诊排班预约' },
  { title: '挂号费支付' },
  { title: '候诊与报到' }
]

const form = reactive({
  name: '',
  gender: 'male',
  idCard: '',
  birthDate: '',
  insurance: 'self',
  cardNumber: '',
  email: '',
  password: ''
})

const handleOpenModal = () => {
  showModal.value = true
}

// 异步提交表单数据并处理响应
async function submitForm() {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      throw new Error(`HTTP 错误！状态：${response.status}`);
    }

    const result = await response.json()

    // 修复变量声明，避免全局覆盖
    const storage = window.localStorage
    storage.setItem('token', result.data.token)
    storage.setItem('uid', result.data.uid)
    storage.setItem('name', result.data.patientName)
    storage.setItem('idCard', result.data.expiresAt)
    
    return true // 成功标识
  } catch (error) {
    console.error('注册失败:', error)
    return false // 失败标识
  }
}

// 绑定模态框的提交事件
const register = async () => {
  // 等待提交结果
  const isSuccess = await submitForm()
  
  if (isSuccess) {
    alert('账号安全信息绑定成功！将为您跳转至挂号页面。')
    showModal.value = false
    router.push('/appointment')
  } else {
    alert('提交失败，请检查网络或稍后重试。')
  }
}
</script>