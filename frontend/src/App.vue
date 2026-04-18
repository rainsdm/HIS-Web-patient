<!-- 文件路径: src/App.vue -->
<template>
  <!-- Toast 和 Modal 组件放在顶层，它们会自动处理自己的位置和显示 -->
  <Toast />
  <Modal />
  
  <RouterView />
</template>

<script setup>
import Toast from '@/components/base/Toast.vue';
import Modal from '@/components/base/Modal.vue';
</script>