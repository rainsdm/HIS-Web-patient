<template>
  <div class="register-wrapper">
    <div class="breadcrumb mb-4 text-[14px] text-(--text-sub)">当前位置：首页 > 门诊服务 > 患者建档</div>
    
    <div class="register-layout flex flex-col gap-5">
      <StepSidebar :steps="steps" :currentStep="0" />
      
      <div class="form-content w-full">
        <Card title="填写基本信息">
          <div class="form-row flex gap-4 mb-4">
            <Input 
              v-model="form.name" 
              label="患者姓名" 
              placeholder="请输入真实姓名" 
              class="flex-1 mb-0" 
            />
            <div class="field-wrapper flex-1">
              <label class="block text-[14px] mb-1 text-(--text-sub)">性别</label>
              <div class="flex gap-4 items-center h-[44px]">
                <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                  <input type="radio" value="male" v-model="form.gender" class="mr-2"> 男
                </label>
                <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                  <input type="radio" value="female" v-model="form.gender" class="mr-2"> 女
                </label>
              </div>
            </div>
          </div>

          <div class="form-row flex gap-4 mb-4">
            <Input 
              v-model="form.idCard" 
              label="身份证号" 
              placeholder="请输入18位身份证号码" 
              class="flex-1 mb-0" 
            />
            <Input 
              v-model="form.birthDate" 
              type="date" 
              label="出生日期" 
              class="flex-1 mb-0" 
            />
          </div>

          <div class="field-wrapper mb-4 mt-4">
            <label class="block text-[14px] mb-1 text-(--text-sub)">医疗保障类型</label>
            <div class="flex gap-4 items-center h-[44px]">
              <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                <input type="radio" value="self" v-model="form.insurance" class="mr-2"> 彻底自费
              </label>
              <label class="inline-flex items-center cursor-pointer text-(--text-main)">
                <input type="radio" value="medicare" v-model="form.insurance" class="mr-2"> 医保卡/社保卡
              </label>
            </div>
          </div>

          <Input 
            v-if="form.insurance === 'medicare'" 
            v-model="form.medicareCard" 
            label="医保卡号/社保卡号" 
            placeholder="请输入卡号以便门诊统筹结算" 
            class="mb-4" 
          />

          <div class="action-footer mt-7 pt-5 border-t border-solid border-(--border) text-right">
            <Button variant="outline" class="mr-3" @click="$router.push('/login')">返回登录</Button>
            <Button @click="handleOpenModal">提交并建立档案</Button>
          </div>
        </Card>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay fixed inset-0 bg-[rgba(46,42,40,0.6)] flex items-center justify-center z-[1000] p-5">
      <Card title="完善安全信息" noTitleBorder class="w-full max-w-[450px] mb-0 max-h-[90vh] overflow-y-auto shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        <p class="text-[14px] text-(--text-sub) mb-5">为了确保您的就诊隐私与电子报告安全，请绑定个人邮箱并设定独立密码。</p>
        
        <div class="form-group mb-4">
          <Input 
            v-model="form.email" 
            label="个人邮箱地址" 
            placeholder="example@mail.com" 
            class="mb-1"
          />
          <div v-show="errors.email" class="text-(--danger) text-[12px] mt-1">请输入有效的邮箱格式</div>
        </div>

        <div class="form-group mb-4">
          <Input 
            v-model="form.password" 
            type="password" 
            label="设定独立密码" 
            placeholder="请输入新密码" 
            class="mb-1"
          />
          <ul class="rule-list text-[12px] text-(--text-sub) mt-2 pl-[18px] list-disc leading-relaxed">
            <li>长度要求 8 - 16 位</li>
            <li>必须同时包含大写字母与小写字母</li>
            <li>必须包含数字</li>
            <li>必须包含特殊字符</li>
          </ul>
          <div v-show="errors.password" class="text-(--danger) text-[12px] mt-1">密码不符合复杂度要求，请检查全部包含项</div>
        </div>

        <Button class="w-full mt-2" @click="handleBind">确认绑定并开启就医</Button>
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

// 表单数据模型
const form = reactive({
  name: '',
  gender: 'male',
  idCard: '',
  birthDate: '',
  insurance: 'self',
  medicareCard: '',
  email: '',
  password: ''
})

// 错误状态控制
const errors = reactive({
  email: false,
  password: false
})

const handleOpenModal = () => {
  showModal.value = true
  errors.email = false
  errors.password = false
}

const handleBind = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/

  errors.email = !emailRegex.test(form.email)
  errors.password = !pwdRegex.test(form.password)

  if (!errors.email && !errors.password) {
    alert('账号安全信息绑定成功！将为您跳转至挂号页面。')
    showModal.value = false
    router.push('/appointment')
  }
}
</script>

<style scoped>
@reference "@/style.css";
</style>