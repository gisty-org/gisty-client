/* eslint-disable vue/comment-directive */
<template>
    <div>
        <base-spinner :show="isLoading"></base-spinner>
        <div class="grid grid-cols-5 grid-rows-1 h-screen" >
            <div class="col-span-1 pt-12  items-center relative shadow-2xl" style="background-color: #667eea;">
                <div class="pb-6" @click="this.$router.push('/profile')">
                    <div class="rounded-full h-32 w-32 mx-auto bg-white" >
                        <h1 class="text-center p-4 text-6xl" style="color: #667eea;">{{ fullName[0] }}</h1>
                    </div>
                    <div class="mx-auto text-center mt-5">
                        <p class="text-white font-semibold text-xl">{{ 'Hello, ' + fullName }} <b-icon-pencil-square class="inline-block ml-1 mb-1 text-xl"></b-icon-pencil-square></p>
                    </div>
                </div>
                <div>
                    <ul class="overflow-scroll" style="height: 29rem">
                        <li 
                            v-for="subject in allSubjects"
                            :key="subject" 
                            class="text-white font-semibold text-lg px-3 py-3 align-middle item-hover rounded-lg m-3"
                            :class="{ isSelected: isCurrentFolder(subject) }"
                            @click="select(subject)"
                        >
                            <b-icon-folder-fill class="inline-block mr-2 mb-1 text-lg"></b-icon-folder-fill>
                            <!-- <b-icon-folder class="inline-block mr-2 mb-1 text-lg"></b-icon-folder> -->
                            {{ subject }}
                        </li>
                    </ul>
                </div>
                <div class="inset-x-0 absolute bottom-0 p-0" @click="logout">
                    <div class="logout-div text-xl h-12 font-bold">
                        <b-icon-arrow-bar-left class="inline-block mr-2 mb-1 text-xl"></b-icon-arrow-bar-left>Logout
                    </div>
                </div>
            </div>
            <div class="col-span-4 p-16 overflow-auto">
                <div v-if="isNotSelected" class="text-center mt-32">
                    <div class="rounded-full w-1/2 mx-auto">
                        <img src="../assets/undraw_empty_xct9.svg" alt="" class="object-cover">
                    </div>
                </div>
                <div v-else>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            isLoading: false
        }
    },
    computed: {
        fullName(){
            return this.$store.getters['user/getFullName'];
        },
        allSubjects(){
            return this.$store.getters['summary/getSubjects'];
        },
        isNotSelected(){
            return this.$store.getters['user/getCurrentFolder'] === '';
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('user/logout');
            this.$router.replace('/');
        },
        isCurrentFolder(subject){
            return this.$store.getters['user/getCurrentFolder'] === subject;
        },
        select(subject){
            this.$store.commit('user/setCurrentFolder',{ currentFolder: subject });
            this.$router.push('/home/' + this.$store.getters['user/getCurrentFolder']);
        }
    },
    async created(){
        this.isLoading = true;
        if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            this.$store.commit('user/setUser',user);
        }
        await this.$store.dispatch('summary/loadData');
        this.isLoading = false;
    }
}
</script>

<style scoped>

.logout-div {
    @apply px-3;
    @apply py-2;
    @apply m-3;
    background-color: white;
    @apply rounded-lg;
    color: #667eea;
}

.logout-div a{
    @apply text-lg;
    @apply font-medium;
    @apply text-gray-900;
}

.isSelected {
    background-color:white;
    color: #667eea;
}

.sidebar{
    margin-bottom: -5000px;
    padding-bottom: 5000px;
}

.container{
    overflow: hidden;
}

.item-hover:hover {
    background-color:white;
    color: #667eea;
}
</style>