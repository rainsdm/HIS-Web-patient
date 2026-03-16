<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue';
import TheFooter from '@/components/footer/footer.vue';

</script>

<template>
    <TheHeader />
    <main class="container">
        <RouterView />
    </main>
    <TheFooter />
</template>

<style scoped>
    @reference "@/style.css";
    .container {
        @apply mx-auto my-[30px] py-0 px-[20px];
        @apply max-w-[1000px] min-h-[60vh];
    }
</style>