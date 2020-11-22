<template>
    <div>
        <!-- Spinner -->
        <base-spinner :show="isLoading"></base-spinner>

        <!-- Snapshot Preview -->
        <image-view :show="showImageView" @close="viewSnapshot(null)" >
            <template v-slot:default>
                <img :src="currentSnapshot.url" alt="snapshot">
            </template>
            <template v-slot:actions>
                <div @click="toggleConfirmSnapshotDeleteDialog(true)">
                    <b-icon-trash class="text-3xl text-gray-300 inline-block mr-5"></b-icon-trash>
                </div>
            </template>
        </image-view>

        <!-- Summary Delete Dialog -->
        <base-dialog :show="showConfirmSummaryDeleteDialog" @close="toggleConfirmSummaryDeleteDialog(false)">
            <template #header>
                <h1 class="text-gray-900 text-xl">
                    <b-icon-exclamation-circle class="inline-block text-red-700 mb-1 mr-1"></b-icon-exclamation-circle>
                    Delete Summary
                </h1>
            </template>
            <template #default>
                <h1>This action will permanently delete this summary and all attached snapshots. Are you sure you want to continue?</h1>
            </template>
            <template #actions>
                <div class="flex w-full border-gray-400 mt-4">
                    <div class="w-1/2 border-r border-t border-gray-400" @click="toggleConfirmSummaryDeleteDialog(false)">
                        <button class="text-center focus:outline-none w-full text-lg p-2">
                            No
                        </button>
                    </div>
                    <div class="w-1/2 bg-red-600" @click="deleteSummary">
                        <button class="text-center text-white focus:outline-none w-full text-lg p-2">
                            Yes
                        </button>
                    </div>
                </div>
            </template>
        </base-dialog>

        <!-- Snapshot Delete Dialog -->
        <base-dialog :show="showConfirmSnapshotDeleteDialog" @close="toggleConfirmSnapshotDeleteDialog(false)">
            <template #header>
                <h1 class="text-gray-900 text-xl">
                    <b-icon-exclamation-circle class="inline-block text-red-700 mb-1 mr-1"></b-icon-exclamation-circle>
                    Delete Snapshot
                </h1>
            </template>
            <template #default>
                <h1>This action will permanently delete this snapshot. Are you sure you want to continue?</h1>
            </template>
            <template #actions>
                <div class="flex w-full border-gray-400 mt-4">
                    <div class="w-1/2 border-r border-t border-gray-400" @click="toggleConfirmSnapshotDeleteDialog(false)">
                        <button class="text-center focus:outline-none w-full text-lg p-2">
                            No
                        </button>
                    </div>
                    <div class="w-1/2 bg-red-600" @click="deleteSnapshot(currentSnapshot.id)">
                        <button class="text-center text-white focus:outline-none w-full text-lg p-2">
                            Yes
                        </button>
                    </div>
                </div>
            </template>
        </base-dialog>

        <!-- Share summary dialog -->
        <base-dialog :show="showShareSummaryDialog" @close="toggleShareSummaryDialog(false)">
            <template #header>
                <h1 class="text-gray-900 text-xl">
                    <b-icon-share class="inline-block mb-1 mr-1" style="color: #667eea"></b-icon-share>
                    Share Summary
                </h1>
            </template>
            <template #default>
                <h1>Enter email of the account you want to share this summary with</h1>
                <div class="input-div">
                    <input id="share" class="custom-input" type="email" placeholder="Email" v-model.trim="credential" />
                    <div class="input-error">{{ credentialError }}</div>
                </div>
            </template>
            <template #actions>
                <div class="flex w-full border-gray-400 mt-1">
                    <div class="w-1/2 border-r border-t border-gray-400" @click="toggleShareSummaryDialog(false)">
                        <button class="text-center focus:outline-none w-full text-lg p-2">
                            Cancel
                        </button>
                    </div>
                    <div class="w-1/2" style="background-color: #667eea;" @click="shareSummary">
                        <button class="text-center text-white focus:outline-none w-full text-lg p-2">
                            Share
                        </button>
                    </div>
                </div>
            </template>
        </base-dialog>

        <!-- Summary title -->
        <div class="flex justify-between">
            <button @click="goBack" class="focus:outline-none hover:bg-gray-200 p-2 rounded">
                <b-icon-arrow-left class="inline-block mb-1 text-3xl"></b-icon-arrow-left>
            </button>
            <div>
                <h1 class="text-center text-3xl text-gray-800 font-semibold">{{ summary.title }}</h1>
            </div>
            <div>
                <button class="focus:outline-none hover:bg-gray-200 p-2 rounded" @click="toggleConfirmSummaryDeleteDialog(true)">
                    <b-icon-trash class="text-3xl inline-block mb-1"></b-icon-trash>
                </button>
                <button class="focus:outline-none hover:bg-gray-200 p-2 rounded" @click="toggleShareSummaryDialog(true)">
                    <b-icon-share class="text-3xl mb-1 inline-block"></b-icon-share>
                </button>
            </div>
        </div>
        
        <!-- tabs -->
        <div class="w-1/2 bg-gray-100 mx-auto mt-12 rounded-lg">
            <div class="w-1/2 text-center inline-block border-r"  @click="setCurrentTab('summary')">
                <p 
                    class="text-2xl font-semibold rounded-l-lg text-gray-700"
                    :class="{ 'is-selected': isCurrentTab('summary') }"
                >Summary</p>
            </div>
            <div class="w-1/2 text-center inline-block" @click="setCurrentTab('snapshots')">
                 <p 
                    class="text-2xl font-semibold rounded-r-lg text-gray-700"
                    :class="{ 'is-selected': isCurrentTab('snapshots') }"
                >Snapshots</p>
            </div>
        </div>

        <!-- summary -->
        <div class="mt-10 mx-12" v-if="isCurrentTab('summary')">
            <article class="text-xl tracking-wide">
                <div v-for="(point,index) in summary.content.split('.')" :key="index">
                    <li v-if="point!=='' && point!==' '" class="m-3">
                        {{ point + '.' }}
                    </li>
                </div>
                
            </article>
        </div>

        <!-- snapshots -->
        <section class="mt-10" v-else>
            <div  v-if="snapshotsPresent">
                <div class="text-center text-3xl text-gray-800 font-semibold">
                    <h1>Snapshots</h1>
                </div>
                <div class="list">
                    <div class="item" v-for="snapshot in snapshots" :key="snapshot.id" @click="viewSnapshot(snapshot)">
                        <img :src="snapshot.url">
                    </div>
                </div>
            </div>
            <div class="text-center text-3xl text-gray-800 font-semibold" v-else>
                <h1>No Snapshots Attached</h1>
            </div>
        </section>
    </div>
    
</template>

<script>

export default {
    props:['folderName','fileId'],
    data(){
        return {
            summary: null,
            snapshots: null,
            currentSnapshot: null,
            showConfirmSummaryDeleteDialog: false,
            showImageView: false,
            showConfirmSnapshotDeleteDialog: false,
            showShareSummaryDialog: false,
            credential: '',
            credentialError: '',
            isLoading: false,
            currentTab: null
        }
    },
    methods:{
        setCurrentTab(value){
            this.currentTab = value;
        },
        isCurrentTab(value){
            return this.currentTab === value;
        },
        goBack(){
            this.$router.back();
        },
        viewSnapshot(snapshot){
            if(snapshot){
                this.showImageView = true;
            }else{
                this.showImageView = false;
            }
            this.currentSnapshot = snapshot;
        },
        async deleteSnapshot(id){
            this.toggleConfirmSnapshotDeleteDialog(false);
            this.isLoading = true;
            const status = await this.$store.dispatch('summary/deleteSnapshot',{
                summaryId: this.fileId,
                snapshotId: id
            });
            if(status === 200){
                this.snapshots = this.snapshots.filter(snapshot => {
                    return snapshot.id !== id;
                });
            }else{
                alert(status + ' An error occurred')
            }
            this.isLoading = false;
        },
        async deleteSummary(){
            this.toggleConfirmSummaryDeleteDialog(false);
            this.isLoading = true;
            const status = await this.$store.dispatch('summary/deleteSummary',{
                summaryId: this.fileId
            });
            if(status === 200){
                let summaries = this.$store.getters['summary/getSummaries'][this.folderName];
                if(summaries){
                    this.goBack();
                }else{
                    this.$store.commit('user/setCurrentFolder',{ currentFolder: '' });
                    this.$router.replace('/home');
                }
            }else{
                alert(status + ' An error occurred');
            }
            this.isLoading = false;
        }, 
        async shareSummary(){
            this.toggleShareSummaryDialog(false);
            this.isLoading = true;
            if(this.credential===''){
                this.credentialError = 'Please enter a username or email';
                return;
            }
            let snapshots = null;
            if(this.snapshotsPresent){
                snapshots = this.snapshots.map(s => {
                    return s.url;
                });
            }
            const status = await this.$store.dispatch('summary/shareSummary',{
                email: this.credential,
                title: this.summary.title,
                content: this.summary.content,
                snapshots: snapshots
            });
            if(status !== 200){
                alert(status + ' An error occurred');
            }
            this.credential = '';
            this.credentialError = '';
            this.isLoading = false;
        },
        toggleConfirmSummaryDeleteDialog(value){
            this.showConfirmSummaryDeleteDialog = value;
        },
        toggleConfirmSnapshotDeleteDialog(value){
            this.showImageView = false;
            this.showConfirmSnapshotDeleteDialog = value;
        },
        toggleShareSummaryDialog(value){
            this.showShareSummaryDialog = value;
        }
    },
    created(){
        this.isLoading = true;
        let summaries = this.$store.getters['summary/getSummaries'][this.folderName];
        this.summary = summaries.find((s) => {
            return s.id === Number(this.fileId);
        });
        this.snapshots = this.summary.snapshots;
        this.currentTab = 'summary';
        this.isLoading = false;
    },
    computed:{
        snapshotsPresent(){
            return this.snapshots.length > 0;
        }
    }
}
</script>

<style scoped>
.list {
    display: flex;
    padding: 20px;
    overflow-x: auto;
}

.item {
    height: 15%;
    width: 30%;
    flex-shrink: 0;
}

.item:not(:last-child) { margin-right: 10px; }

.item:last-child {
    position: relative;
}

.item:last-child::after {
    position: absolute;
    left: 100%;
    height: 1px;
    width: 20px;
    display: block;
    content: "";
}

.input-div{
    @apply mt-4; 
    @apply px-2;
    @apply w-full;
}

.custom-input{
    @apply w-full; 
    @apply border;
    @apply px-4;
    @apply py-2;
    @apply rounded-lg;
    @apply border-gray-500;
    @apply outline-none ;
}
.custom-input:focus{
    @apply border-blue-600;
}
.input-error{
    @apply text-xs;
    @apply text-red-600;
    @apply mt-1;
}
.is-selected {
    background-color: #667eea;
    @apply text-white;
}
</style>