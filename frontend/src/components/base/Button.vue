<template>
  <button :type="type" class="transition-all active:scale-95 px-5 py-2 rounded text-[14px]"
    :class="variant === 'outline' ? 'btn-outline' : 'btn-primary'">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // 'primary' | 'outline'
  type: { type: String, default: 'button' } // 'button' | 'submit' | 'reset'
})
</script>

<style scoped>
@reference "@/style.css";
</style>