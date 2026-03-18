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
    @apply w-full flex justify-between px-[50px] pt-[30px] pb-[20px] bg-(--surface) border border-solid border-(--border) rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] pointer-events-none box-border;
}

.timeline-item { 
    @apply relative flex-1 text-center pt-[24px] text-(--text-sub) text-[14px] whitespace-nowrap;
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