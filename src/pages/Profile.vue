<template>
    <div>
        <base-spinner :show="isLoading"></base-spinner>
        <nav-bar></nav-bar>
        <div class="w-2/5 mx-auto my-12">
            <base-card>
                <div style="background-color: #667eea;" class="h-32">

                </div>
                <div class="flex justify-center -mt-8">
                    <base-image @profile="selectImage" class="border-white border-2 shadow-lg -mt-3" :default-image="getProfile" ></base-image>
                </div>
                <form @submit.prevent="update" class="mx-5 my-3">
                    <div class="input-div">
                        <label class="input-label" for="fullName">Full Name</label>
                        <input id="fullName" class="custom-input" type="text" v-model.trim="fullName" />
                        <div class="input-error">{{ fullNameError }}</div>
                    </div>
                    <div class="input-div">
                        <label class="input-label" for="email">Email</label>
                        <input id="email" class="custom-input" type="email" v-model.trim="email" />
                        <div class="input-error">{{ emailError }}</div>
                    </div>
                    <div class="input-div">
                        <label class="input-label" for="contact">Phone Number</label>
                        <input id="contact" class="custom-input" type="text" v-model.trim="contact" />
                        <div class="input-error">{{ contactError }}</div>
                    </div>
                    <div class="mt-4 flex justify-center">
                        <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none">Update Profile</button>
                    </div>
                </form>
            </base-card>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/Navbar.vue';
export default {
    components:{
        NavBar,
    },
    data(){
        return {
            fullName: '',
            email: '',
            contact: '',
            profile: '',
            image: null,
            fullNameError: '',
            emailError: '',
            contactError: '',
            isLoading: '',
            isValid: true,
        }
    },
    methods: {
        selectImage(image){
            this.image = image;
            console.log(this.image);
        },
        resetErrors(){
            this.fullNameError = '';
            this.emailError = '';
            this.contactError = '';
        },
        resetInputs(){
            this.fullName = '';
            this.email = '';
            this.contact = '';
        },
        validate(){
            this.isValid = true;
            this.resetErrors();

            if(this.fullName===''){
                this.fullNameError = '*Please enter your full name';
                this.isValid = false;
            }

            const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            if(!emailPattern.test(this.email)){
                this.emailError = '*Please enter a valid email address';
                this.isValid = false;
            }

            if(this.contact===''){
                this.contactError = '*Please enter your phone number';
                this.isValid = false;
            }
        },
        async update(){
            this.isLoading = true;
            this.validate();

            if(!this.isValid){
                this.isLoading = false;
                return;
            }

            const status = await this.$store.dispatch('user/editProfile',{
                body: {
                    fullName: this.fullName,
                    email: this.email,
                    contact: this.contact,
                },
                image: this.image
            });

            if(status === 200){
                this.resetInputs();
                this.resetErrors();
                this.fullName = this.$store.getters['user/getFullName'];
                this.email = this.$store.getters['user/getEmail'];
                this.contact = this.$store.getters['user/getContact'];
                this.profile = this.getProfile;
                this.isLoading = false;
            }else if(status === 403){
                this.emailError = "Email ID already in use";
            }else{
                alert("Something went Wrong");
            }
            this.isLoading = false;

        }
    },
    computed:{
        initial(){
            return this.$store.getters['user/getFullName'][0];
        },
        getProfile(){
            return this.$store.getters['user/getProfile'];
        },
        hasProfile(){
            return !!this.$store.getters['user/getProfile'];
        }
    },
    async created(){
        this.isLoading = true;
        if(localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            this.$store.commit('user/setUser',user);
        }
        await this.$store.dispatch('user/getProfile');
        this.fullName = this.$store.getters['user/getFullName'];
        this.email = this.$store.getters['user/getEmail'];
        this.contact = this.$store.getters['user/getContact'];
        this.profile = this.$store.getters['user/getProfile'];
        this.isLoading = false;
    }
}
</script>

<style scoped>
.input-div{
    @apply mb-2;
    @apply w-full;
}
.input-label{
    @apply block;
    @apply mb-1;
    @apply text-xl;
    @apply text-gray-700;
}
.custom-input{
    @apply w-full;
    @apply border;
    @apply px-3;
    @apply py-2;
    @apply rounded-lg;
    @apply h-12;
    @apply border-gray-400;
    @apply text-gray-700;
}
.custom-input:focus{
    border-color: #667eea;
    @apply outline-none ;
}
.input-error{
    @apply text-xs;
    @apply text-red-600;
    @apply mt-1;
}
</style>