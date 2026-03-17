<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.label">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true }
})
</script>

<style scoped>
@reference "@/style.css";
.table-container { @apply w-full overflow-x-auto; }
.data-table { @apply w-full border-collapse mt-4 min-w-[600px]; }
.data-table :deep(th), .data-table :deep(td) {
  @apply border border-solid border-(--border) p-3 text-left text-[14px];
}
.data-table th { @apply bg-(--bg-color) text-(--text-sub) font-normal; }
</style>