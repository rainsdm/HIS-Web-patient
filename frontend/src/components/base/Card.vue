<template>
  <div class="card">
    <div v-if="title" class="card-title" :class="{ 'no-border': noTitleBorder }">
      {{ title }}
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  noTitleBorder: { type: Boolean, default: false }
})
</script>

<style scoped>
@reference "@/style.css";
.card {
  @apply bg-(--surface) border border-solid border-(--border) rounded-lg p-6 mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)];
}
.card-title {
  @apply text-[18px] font-bold mb-4 text-(--primary) border-b border-solid border-(--border) pb-2;
}
.no-border {
  @apply border-none pb-0;
}
</style>