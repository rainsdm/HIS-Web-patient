<!-- 文件路径: src/components/base/Toast.vue -->
<template>
  <div class="toast-container fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
    <TransitionGroup name="toast" tag="div">
      <div 
        v-for="toast in toastStore.toasts" 
        :key="toast.id" 
        class="toast-item mb-2 pointer-events-auto"
        :class="toast.type === 'error' ? 'bg-(--danger)' : 'bg-(--success)'"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast';
const toastStore = useToastStore();
</script>

<style scoped>
@reference "@/style.css";

.toast-item {
  @apply text-white font-bold rounded-lg shadow-xl px-6 py-3 min-w-[280px] text-center;
}

/* --- Vue Transition 动画 --- */

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
  position: absolute; /* 关键：防止列表项在离开时挤占空间 */
}
</style>