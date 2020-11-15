<template>
    <div class="rounded-lg border md:shadow w-full overflow-hidden object-center" :class="{dark: isDark,
    'hover:bg-gray-200': hover, padding: hasPadding}">
        <slot>

        </slot>
    </div>
</template>

<script>
export default {
    props:['isDark','hover','hasPadding']
}
</script>

<style scoped>
.dark{
    @apply bg-gray-900;
    @apply text-white;
}

.padding{
    @apply px-5;
    @apply py-5;
}
</style>