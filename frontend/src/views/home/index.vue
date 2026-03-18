<template>
    <TheHeader />
    <main class="container">
        <RouterView />
    </main>
    <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue';
import TheFooter from '@/components/footer/footer.vue';
</script>

<style scoped>
    @reference "@/style.css";
    .container {
        @apply mx-auto py-0 max-w-[1000px] min-h-[60vh];
        /* 移动端优先，电脑端通过 md: 覆盖 */
        @apply my-[10px] px-[10px] md:my-[30px] md:px-[20px];
    }
</style>