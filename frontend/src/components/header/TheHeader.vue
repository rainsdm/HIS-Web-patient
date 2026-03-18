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
    @apply flex items-center;
    @apply flex-col justify-center md:flex-row md:justify-between;
    
    /* 尺寸与边距类 */
    @apply h-auto pt-[10px] px-[15px] md:h-[60px] md:pt-0 md:px-10;
    
    /* 容器背景类 */
    @apply bg-(--surface);
    
    /* 底部边框类 */
    @apply border-b border-solid border-(--border);
}
</style>

<script setup>
import Title from './Title.vue'
import TheNavbar from './TheNavbar.vue'
</script>