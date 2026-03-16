<script setup lang="ts">
import TheNavbar from './TheNavbar.vue';
import Title from './Title.vue';
</script>

<template>
    <header class="header">
        <Title />
        <TheNavbar />
    </header>
</template>

<style scoped>
@reference "@/style.css";
.header {
    /* 布局排版类 */
    @apply flex justify-between items-center;
    
    /* 尺寸与边距类 */
    @apply h-[60px] px-10;
    
    /* 容器背景类 */
    @apply bg-(--surface);
    
    /* 底部边框类 */
    @apply border-b border-solid border-(--border);
}
</style>