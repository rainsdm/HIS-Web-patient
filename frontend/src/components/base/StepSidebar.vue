<template>
  <div class="sidebar">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="timeline-item"
      :class="{
        'active': currentStep === index
      }"
    >
      {{ step.title }}<br>
      <span>
        ({{ currentStep === index ? '当前环节' : (currentStep > index ? '已完成' : '待办理') }})
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
  currentStep: { type: Number, default: 0 }
})
</script>

<style scoped>
@reference "@/style.css";

.sidebar { 
    @apply w-full flex justify-between pointer-events-none box-border;
    /* 移动端样式 */
    @apply px-[10px] pt-[20px] pb-[12px] bg-transparent border-none shadow-none;
    /* 电脑端样式 */
    @apply md:px-[50px] md:pt-[30px] md:pb-[20px] md:bg-(--surface) md:border md:border-solid md:border-(--border) md:rounded-lg md:shadow-[0_2px_8px_rgba(0,0,0,0.02)];
}

.timeline-item { 
    @apply relative flex-1 text-center text-(--text-sub) whitespace-nowrap;
    @apply pt-[20px] text-[12px] md:pt-[24px] md:text-[14px];
}

.timeline-item::before { 
    content: ''; 
    @apply absolute left-1/2 top-0 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-(--border) z-[2];
}

.timeline-item::after {
    content: '';
    @apply absolute top-[4px] left-1/2 w-full h-[2px] bg-(--border) z-[1];
}

.timeline-item:last-child::after { 
    display: none; 
}

/* 隐藏括号内的状态副标题 */
.timeline-item span { 
    display: none; 
}

.timeline-item.active { 
    @apply text-(--primary) font-bold; 
}

.timeline-item.active::before { 
    @apply bg-(--primary); 
}
</style>