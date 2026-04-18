<!-- 文件路径: src/components/base/Toast.vue -->
<template>
  <div class="toast-container fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
    <!-- 使用 <TransitionGroup> 来为列表的进入和离开添加动画 -->
    <TransitionGroup name="toast" tag="div">
      <!-- 
        *** 改动(1): 移除了动态 class 绑定 ***
        所有类型的通知（成功、错误）现在都使用统一、内敛的样式。
      -->
      <div 
        v-for="toast in toastStore.toasts" 
        :key="toast.id" 
        class="toast-item mb-2 pointer-events-auto"
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

/* *** 改动(2): 重新设计了 toast-item 的样式 *** */
.toast-item {
  /* 
    背景色: 使用应用的背景色，与页面融为一体。
    文字颜色: 使用主题的主文字颜色，确保可读性并适应深色/浅色模式。
    字体: 调整为中等粗细，略微突出但不过于强烈。
    边框和阴影: 添加一层非常微妙的边框和柔和的阴影，来将通知与下方内容分离开。
  */
  @apply 
    bg-(--bg-color) 
    text-(--text-main) 
    font-semibold 
    rounded-lg 
    shadow-lg 
    border 
    border-(--border-color)
    px-6 py-3 
    min-w-[280px] 
    text-center;
}

/* --- Vue Transition 动画 (保持不变) --- */

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
  /* 关键：防止列表项在离开时挤占空间 */
  position: absolute; 
  transition: all 0.3s ease-in;
}
</style>