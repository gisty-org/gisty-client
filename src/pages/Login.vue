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
                    <form @submit.prevent="login">
                        <div class="input-div">
                            <label class="input-label" for="email">Email</label>
                            <input id="email" class="custom-input" type="email" v-model.trim="email" />
                            <div class="input-error">{{ emailError }}</div>
                        </div>
                        <div class="input-div">
                            <label class="input-label" for="password">Password</label>
                            <input id="password" class="custom-input" type="password" v-model.trim="password"/>
                            <div class="input-error">{{ passwordError }}</div>
                        </div>
                        <div class="flex justify-between">
                            <label class="input-label">
                                <input type="checkbox" class="form-checkbox" v-model="rememberMe">
                                <span class="ml-2">Remember Me</span>
                            </label>
                            <span class="block text-lg mb-2" style="color: #667eea;"><router-link to="/forgot_password">Forgot your password?</router-link></span>
                        </div>
                        <div class="mt-3 flex justify-center">
                            <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none w-full">Login</button>
                        </div>
                        <div class="text-center text-gray-600 mt-2">
                            <p>Don't have an account yet? <router-link to="/register" class="underline" style="color: #667eea">Sign Up</router-link> here</p>
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
            email:'',
            password: '',
            emailError: '',
            passwordError: '',
            isValid: true,
            rememberMe: false,
            isLoading: false
        }
    },
    methods:{
        resetInputs(){
            this.email = '';
            this.password = '';
        },
        resetErrors(){
            this.emailError = '';
            this.passwordError = '';
        },
        validate(){
            this.isValid = true;
            this.resetErrors();
            this.emailError = '';
            this.passwordError = '';
            const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            if(!emailPattern.test(this.email)){
                this.emailError = '*Please enter a valid email address';
                this.isValid = false
            }
            if(this.password==='' || this.password.length < 8){
                this.passwordError = '*Please enter a valid password';
                this.isValid = false;
            }
        },
        async login(){
            this.isLoading = true;
            this.validate();
            if(!this.isValid)
                return;
            
            const body = {
                email: this.email,
                password: this.password 
            };

            const status = await this.$store.dispatch('user/login', {
                body: body,
            });

            if(status === 200){
                this.resetInputs();
                this.resetErrors();
                if(this.rememberMe)
                    localStorage.setItem('rememberMe',true);
                this.isLoading = false;
                this.$router.replace('/home');
            }else if(status === 404){
                this.emailError = "Account not found";
            }else if(status === 401){
                this.passwordError = "Incorrect Password";
            }else{
                alert("Something went Wrong");
            }
            this.isLoading = false;
        },
    },
    created(){
        if(localStorage.getItem('rememberMe')){
            this.$store.commit('user/setAuth',{
                isAuthenticated: true
            })
            this.$router.replace('/home');
        }
    }
}
</script>

<style scoped>
.input-div{
    @apply mb-4;
    @apply w-full;
}
.input-label{
    @apply block;
    @apply mb-2;
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
    @apply text-sm;
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