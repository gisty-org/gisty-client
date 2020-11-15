<template>
    <nav class="bg-transparent">
    <div class="container mx-auto px-6 py-2 md:flex md:justify-between md:items-center">
        <div class="flex justify-between items-center">
            <div>
                <router-link class="text-gray-900 text-xl font-bold md:text-2xl hover:text-gray-900" to="/">
                    <b-icon-card-list class="inline-block mr-1 mb-1"></b-icon-card-list>
                    Gisty
                </router-link>
            </div>
        </div>
        <div class="md:flex items-center">
            <div class="flex flex-col md:flex-row md:mx-6">
                <router-link class="my-1 text text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/login" v-if="!isAuthenticated">Login</router-link>
                <router-link class="my-1 text text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/register" v-if="!isAuthenticated">Sign Up</router-link>
                <router-link class="my-1 text text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/home" v-if="isAuthenticated">Home</router-link>
                <router-link class="my-1 text text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0" to="/logout" v-if="isAuthenticated">Log Out</router-link>
            </div>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
    computed:{
        isAuthenticated(){
            return localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false;
        }
    },
}
</script>

<style scoped>
a {
    @apply text-gray-900;
    @apply cursor-pointer;
    @apply border-b;
    @apply border-transparent;
}
nav a {
    @apply mr-5;
}
div.inline-flex a{
    @apply ml-5;
}
a:hover {
    @apply border-b;
    @apply border-transparent;
    @apply border-indigo-600;
}
</style>