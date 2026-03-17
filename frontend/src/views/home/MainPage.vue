<template>
  <div class="main-dashboard space-y-6">
    
    <div class="bg-(--primary) text-(--surface) rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <h3 class="text-[18px] font-bold">医院公告</h3>
      <p class="mt-2 opacity-90 text-[14px]">为缩短您的等候时间，建议优先使用线上预约挂号系统进行排班取号，请带好身份证件就医。</p>
    </div>

    <div>
      <h3 class="text-[18px] font-bold mb-4 text-(--text-main)">快捷业务办理</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="nav in navs" :key="nav.name"
          class="nav-box p-6 border border-solid border-(--border) rounded bg-(--bg-color) text-center transition-all flex flex-col items-center justify-center"
          :class="[
            nav.disabled 
              ? 'cursor-not-allowed opacity-50 grayscale' 
              : 'cursor-pointer hover:border-(--primary) active:scale-95'
          ]"
          @click="!nav.disabled && $router.push(nav.path)"
        >
          <div class="text-[28px] mb-2" :class="nav.disabled ? 'text-(--text-sub)' : nav.color">
            {{ nav.icon }}
          </div>
          
          <h4 class="text-[15px] font-bold text-(--text-main)">
            {{ nav.name }}
            <span v-if="nav.disabled" class="text-[12px] font-normal block text-(--danger) mt-1">(开发中)</span>
          </h4>
          
          <span class="text-[12px] text-(--text-sub) mt-1">{{ nav.desc }}</span>
        </div>
      </div>
    </div>

    <Card title="重点出诊排班速览">
      <ul class="space-y-3 text-[14px]">
        <li class="flex items-center text-(--text-main)">
          <span class="w-[6px] h-[6px] rounded-full bg-(--text-sub) mr-3"></span>
          内科：张三 (主任医师) - 今日上午出诊
        </li>
        <li class="flex items-center text-(--text-main)">
          <span class="w-[6px] h-[6px] rounded-full bg-(--text-sub) mr-3"></span>
          外科：李四 (主治医师) - 今日下午出诊
        </li>
      </ul>
    </Card>

  </div>
</template>

<script setup>
import Card from '@/components/base/Card.vue'

// 快捷入口配置：增加 disabled 属性
const navs = [
  { 
    name: '预约挂号', 
    desc: '在线查排班取号', 
    icon: '📅', 
    path: '/appointment',
    color: 'text-(--primary)',
    disabled: false 
  },
  { 
    name: '门诊缴费', 
    desc: '自助清单结算', 
    icon: '💳', 
    path: '/profile', 
    color: 'text-(--success)',
    disabled: true // 标记为开发中
  },
  { 
    name: '报告查询', 
    desc: '检验与影像结果', 
    icon: '📄', 
    path: '/profile', 
    color: 'text-(--primary)',
    disabled: true // 标记为开发中
  }
]
</script>

<style scoped>
@reference "@/style.css";

/* 禁用状态下的微调 */
.grayscale {
  filter: grayscale(1);
}
</style>