<template>
  <div class="field-wrapper">
    <label v-if="label" class="block text-[14px] mb-1 text-(--text-sub)">{{ label }}</label>
    <select 
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="form-input w-full cursor-pointer"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value || opt" :value="opt.value || opt">
        {{ opt.label || opt }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  options: { type: Array, required: true },
  placeholder: String
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
@reference "@/style.css";
.field-wrapper { @apply mb-4; }
</style>