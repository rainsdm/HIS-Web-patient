<!-- 文件路径: src/views/Register.vue -->
<template>
  <div class="register-wrapper flex justify-center items-center py-10">
    <Card title="建立就诊档案" class="w-full max-w-lg">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input label="姓名" placeholder="请输入真实姓名" v-model="form.name" />
        <Input label="身份证号" placeholder="请输入18位身份证号" v-model="form.identityCard" />
        <Input label="邮箱" type="email" placeholder="用于登录和接收通知" v-model="form.email" />
        <Input label="设置密码" type="password" placeholder="请设置登录密码" v-model="form.password" />

        <div v-if="form.password.length > 0" class="password-strength-container">
          <div class="strength-bar-bg">
            <div 
              class="strength-bar-fill" 
              :style="{ width: passwordStrength.width, backgroundColor: passwordStrength.color }"
            ></div>
          </div>
          <ul class="strength-rules-list">
            <li v-for="rule in passwordRules" :key="rule.key" :class="{ 'met': passwordStrength.rulesMet[rule.key] }">
              <span class="indicator">{{ passwordStrength.rulesMet[rule.key] ? '√' : '×' }}</span>
              {{ rule.text }}
            </li>
          </ul>
        </div>

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
import { reactive, computed } from 'vue';
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
  name: '',
  identityCard: '',
  email: '',
  password: ''
});

const passwordRules = [
  { key: 'length', text: '长度为 8-16 个字符' },
  { key: 'uppercase', text: '包含至少一个大写字母' },
  { key: 'lowercase', text: '包含至少一个-小写字母' },
  { key: 'digit', text: '包含至少一个数字' },
  { key: 'special', text: '包含至少一个特殊字符' }
];

/**
 * 基于信息熵的密码强度计算模型
 * 
 * 1.  计算字符池大小 (Character Pool):
 *     - 根据密码中包含的字符类型（小写、大写、数字、特殊字符），累加一个总的字符池大小。
 *     - 例如，如果密码包含小写字母和数字，则字符池大小为 26 + 10 = 36。
 * 
 * 2.  计算信息熵 (Entropy):
 *     - 熵是衡量信息不确定性的度量，单位为比特(bit)。
 *     - 公式: Entropy = log2(Pool ^ Length) = Length * log2(Pool)
 *     - 熵值越高，密码越难以被猜测或暴力破解。
 * 
 * 3.  将熵值映射到UI:
 *     - 设定一个目标熵值（如 80 bits）作为100%强度的标准。
 *     - 进度条宽度: (当前熵值 / 目标熵值) * 100%
 *     - 进度条颜色: 将熵值百分比映射到 HSL 色彩空间的色相(Hue)上，从 0 (红) 平滑过渡到 120 (绿)。
 *
 * 4.  保留规则列表:
 *     - 独立的 `rulesMet` 对象继续用于驱动文本提示列表，为用户提供清晰的指引。
 */
const passwordStrength = computed(() => {
  const password = form.password;
  // 规则检查，用于驱动UI中的规则列表
  const rulesMet = {
    length: password.length >= 8 && password.length <= 16,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  const score = Object.values(rulesMet).filter(Boolean).length;
  // 实现基于熵的平滑进度与颜色计算
  let characterPool = 0;
  if (rulesMet.lowercase) characterPool += 26;
  if (rulesMet.uppercase) characterPool += 26;
  if (rulesMet.digit) characterPool += 10;
  if (rulesMet.special) characterPool += 32; // 估算常见的特殊字符数量
  let entropy = 0;
  if (password.length > 0 && characterPool > 0) {
    // 熵 = 密码长度 * log2(字符池大小)
    entropy = password.length * Math.log2(characterPool);
  }
  // 将熵值映射到 0-100% 的进度
  const targetEntropy = 80; // 设定一个较高的目标熵值，80位已经非常安全
  const strengthPercentage = Math.min((entropy / targetEntropy) * 100, 100);
  // 将进度百分比映射到 HSL 色相 (0=红, 120=绿)
  const hue = (strengthPercentage / 100) * 120;
  const color = `hsl(${hue}, 90%, 45%)`;
  const width = `${strengthPercentage}%`;
  return { 
    score,      // 用于提交时检查是否满足所有硬性规则
    rulesMet,   // 用于驱动规则列表UI
    color,      // 用于进度条平滑渐变色
    width       // 用于进度条平滑增长
  };
});

const handleSubmit = async () => {
  if (passwordStrength.value.score < passwordRules.length) {
    toastStore.show('密码不符合所有要求，请检查。', 'error');
    return;
  }

  try {
    await userStore.register(form);
    toastStore.show('档案建立成功，您已自动登录！', 'success');
    router.push('/appointment');
  } catch (error) {
    console.error('建档失败:', error);
    toastStore.show('未能完成建档: ' + error.message, 'error');
  }
};
</script>

<style scoped>
@reference "@/style.css";
.password-strength-container {
  @apply mt-2 space-y-2;
}
.strength-bar-bg {
  @apply w-full bg-(--border) rounded-full h-2 overflow-hidden;
}
.strength-bar-fill {
  @apply h-full rounded-full transition-all duration-300 ease-in-out;
}
.strength-rules-list {
  @apply grid grid-cols-1 md:grid-cols-2 gap-x-4 text-[12px] text-(--text-sub) list-none pl-1;
}
.strength-rules-list li {
  @apply transition-colors duration-300;
}
/* 规则满足时的样式 */
.strength-rules-list li.met {
  @apply text-green-600;
}
.indicator {
  @apply inline-block w-4;
}
</style>