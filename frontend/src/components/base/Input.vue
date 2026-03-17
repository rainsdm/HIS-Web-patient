<template>
  <div class="field-wrapper">
    <label v-if="label" class="block text-[14px] mb-1 text-(--text-sub)">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-input w-full"
      :placeholder="placeholder"
    >
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: String
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
@reference "@/style.css";
.field-wrapper { @apply mb-4; }
</style>