<template>
  <div class="step-sidebar">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="step-item"
      :class="{
        'step-active': currentStep === index,
        'step-done': currentStep > index,
        'step-last': index === steps.length - 1
      }"
    >
      {{ step.title }}<br>
      <span class="step-desc">
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
.step-sidebar { @apply w-[220px] shrink-0; }
.step-item {
  @apply pl-5 border-l-2 border-solid border-(--border) mb-6 relative text-(--text-sub) text-[14px] leading-relaxed;
}
.step-item::before {
  content: '';
  @apply absolute left-[-6px] top-0 w-[10px] h-[10px] rounded-full bg-(--border);
}
.step-active { @apply border-l-(--primary) text-(--primary) font-bold; }
.step-active::before { @apply bg-(--primary); }
.step-done { @apply border-l-(--success) text-(--text-sub); }
.step-done::before { @apply bg-(--success); }
.step-last { @apply border-l-0; }
.step-desc { @apply text-[12px] font-normal opacity-80; }
</style>