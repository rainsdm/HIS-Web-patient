<template>
  <div class="field-wrapper">
    <label v-if="label" class="block text-[14px] mb-1 text-(--text-sub)">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-input w-full"
      :placeholder="placeholder"
      :name="name"
    >
    <div v-if="errorMessage" class="text-xs text-(--danger) mt-1 h-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: String,
  name: String,
  errorMessage: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
@reference "@/style.css";
/* 确保即使没有错误信息，整体布局也不会跳动 */
.field-wrapper { 
  @apply mb-2; /* 调整了基础间距以适应可能出现的错误文本 */
}
</style>