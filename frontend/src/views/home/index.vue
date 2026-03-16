<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue';
import TheFooter from '@/components/footer/footer.vue';

</script>

<template>
    <TheHeader></TheHeader>
    <main>
        <RouterView />
    </main>
    <TheFooter></TheFooter>
</template>