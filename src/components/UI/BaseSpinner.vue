<template>
    <div>
        <teleport to="body">
            <div v-if="show" class="backdrop"></div>
            <div v-if="show" class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </teleport>
    </div>
    
</template>

<script>
export default {
    props: ['show']
}
</script>

<style scoped>
.loader {
    position: fixed;
    z-index: 100;
    overflow: hidden;
    top: 40vh;
    background-color: transparent;
    border-top-color: #667eea;
    -webkit-animation: spinner 1.5s linear infinite;
    animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 10;
}

@media (min-width: 768px) {
    .loader {
        left: calc(50% - 3rem);
    }
}
</style>