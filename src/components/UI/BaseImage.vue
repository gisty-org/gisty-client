<template>
    <div class="rounded-full h-32 w-32 mx-auto bg-center bg-cover block" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
        <img src="../../assets/undraw_profile_pic_ic5t.svg" alt="default image" v-if="!imageData && !defaultImage">
        <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
    </div>
</template>

<script>
export default {
    props:{
        defaultImage: String,
    },
    data () {
        return {
            imageData: null
        }
    },  
    methods: {
        chooseImage () {
            this.$refs.fileInput.click()
        },
        onSelectFile () {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('profile', files[0])
            }
        }
    },
    created(){
        this.imageData = this.defaultImage;
    }
}
</script>

<style scoped>

.file-input {
    display: none;
}

</style>