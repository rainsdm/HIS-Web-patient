<!-- 文件路径: src/components/base/Modal.vue -->
<template>
  <Transition name="modal-fade">
    <div v-if="modalStore.isVisible" class="modal-backdrop fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9998]">
      <div class="modal-content bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h3 class="text-xl font-bold mb-4 text-(--text-main)">{{ modalStore.title }}</h3>
        <p class="text-(--text-sub) mb-6">{{ modalStore.message }}</p>
        <div class="flex justify-end gap-3">
          <Button theme="secondary" @click="modalStore.cancel()">取消</Button>
          <Button @click="modalStore.confirm()">确认</Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import Button from '@/components/base/Button.vue';
const modalStore = useModalStore();
</script>

<style scoped>
@reference "@/style.css";

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>