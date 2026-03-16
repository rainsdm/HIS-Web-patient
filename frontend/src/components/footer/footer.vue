<template>
    <footer class="footer">
        医院地址：某某市某某区某某路123号 | 门诊时间：08:00 - 18:00 <br>
        版权所有 &copy; 2026 某某综合医院 | 技术支持：系统运维部
    </footer>
</template>

<style scoped>
    @reference "@/style.css";
    .footer {
        @apply text-center p-[20px] text-[var(--text-sub)];
        @apply text-[12px] mt-[40px];
    }
</style>