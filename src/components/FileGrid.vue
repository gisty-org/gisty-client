<template>
    <transition name="page" mode="out-in">
        <div>
            <div class="grid grid-cols-4 gap-6">
                <div v-for="summary in summaries" :key="summary.id" class="text-center" v-on:click="open(summary.id)">
                    <base-card :isDark="false" :hover="true">
                        <img src="../assets/output-onlinepngtools.png" alt="file_icon">
                        <h3 class="text-xl mt-2">{{ summary.title }}</h3>
                    </base-card>
                </div>
            </div>
        </div>
    </transition>
    
    
</template>

<script>

export default {
    props:['folderName'],
    computed:{
        summaries(){
            return [...this.$store.getters['summary/getSummaries'][this.folderName]].sort((a,b) => {
                return a.title < b.title ? -1 : (a.title > b.title) ? 1 : 0;
            });
        }
    },
    methods:{
        open(fileId){
            this.$router.push('/home/' + this.folderName + '/' + fileId);
        }
    }
}
</script>

<style scoped>
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>