<template>
    <div class="rounded-lg border md:shadow w-full overflow-hidden object-center py-5 px-5" :class="{dark: isDark,
    'hover:bg-gray-200': hover}">
        <slot>

        </slot>
    </div>
</template>

<script>
export default {
    props:['isDark','hover']
}
</script>

<style scoped>
.dark{
    @apply bg-gray-900;
    @apply text-white;
}
</style>