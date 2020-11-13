<template>
    <div>
        <base-spinner :show="isLoading"></base-spinner>
        <div class="flex w-full h-screen">
            <div class="bg-white flex flex-col justify-center items-center w-5/12">
                <div class="w-2/3">
                    <div class="w-full text-center mb-3">
                        <router-link to="/" class="font-bold text-5xl" style="color: #667eea">
                            Gisty
                        </router-link>
                    </div>
                    <form @submit.prevent="register">
                        <div class="input-div flex justify-between">
                            <div class="w-1/2 pr-2">
                                <label class="input-label" for="firstName">First Name</label>
                                <input id="firstName" class="custom-input" type="text" v-model.trim="firstName" />
                                <div class="input-error">{{ firstNameError }}</div>
                            </div>
                            <div class="w-1/2 pl-2">
                                <label class="input-label" for="lastName">Last Name</label>
                                <input id="lastName" class="custom-input" type="text" v-model.trim="lastName" />
                                <div class="input-error">{{ lastNameError }}</div>
                            </div>
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
                        <div class="input-div">
                            <label class="input-label" for="password">Password</label>
                            <input id="password" class="custom-input" type="password" v-model.trim="password"/>
                            <div class="input-error">{{ passwordError }}</div>
                        </div>
                        <div class="input-div">
                            <label class="input-label" for="confirm-password">Confirm Password</label>
                            <input id="confirm-password" class="custom-input" type="password" v-model.trim="confirmPassword"/>
                            <div class="input-error">{{ confirmPasswordError }}</div>
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none w-full">Sign Up</button>
                        </div>
                        <div class="text-center text-gray-600 mt-2">
                            <p>Already registered? <router-link to="/login" class="underline" style="color: #667eea">Sign In</router-link> here</p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="w-7/12" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                <img src="../assets/undraw_authentication_fsn5.svg" alt="" class="h-screen">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            firstName: '',
            lastName: '',
            email:'',
            contact: '',
            password: '',
            confirmPassword: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            contactError: '',
            passwordError: '',
            confirmPasswordError: '',
            isValid: true,
            isLoading: false
        }
    },
    methods:{
        validate(){
            this.isValid = true;
            this.resetErrors();

            if(this.firstName===''){
                this.firstNameError = '*Please enter your first name';
                this.isValid = false;
            }

            if(this.lastName===''){
                this.lastNameError = '*Please enter your last name';
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
            if(this.password==='' || this.password.length < 8){
                this.passwordError = '*Please enter a valid password';
                this.isValid = false;
            }
            if(this.confirmPassword!==this.password){
                this.confirmPasswordError = '*Passwords do not match';
                this.isValid = false;
            }
        },
        async register(){
            this.isLoading = true;
            this.validate();

            if(!this.isValid)
                return;

            const body = {
                fullname: this.firstName + ' ' + this.lastName,
                email: this.email,
                contact: this.contact,
                password: this.password 
            };
    

            const status  = await this.$store.dispatch('user/register',{
                body: body
            });

            if(status === 200){
                this.resetInputs();
                this.resetErrors();
                this.isLoading = false;
                this.$router.replace('/home');
            }else if(status === 403){
                this.emailError = "Email ID already registered";
            }else{
                alert("Something went Wrong");
            }
            this.isLoading = false;
        },
        resetErrors(){
            this.fullNameError = '';
            this.emailError = '';
            this.contactError = '';
            this.passwordError = '';
            this.confirmPasswordError = '';
        },
        resetInputs(){
            this.fullName = '';
            this.email = '';
            this.contact = '';
            this.password = '';
            this.confirmPassword = '';
        }
    },
    created(){
        if(localStorage.getItem('rememberMe'))
            this.$router.replace('/home');
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
.submit{
    @apply px-4;
    @apply py-2;
    @apply text-lg;
    @apply rounded-full;
    @apply shadow;
    @apply font-bold;
    @apply text-gray-800;
    @apply bg-green-200;
}
.submit:focus{
    @apply outline-none;
}
.submit:hover{
    @apply bg-green-300;
}
</style>