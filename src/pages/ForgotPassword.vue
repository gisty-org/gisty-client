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
                    <div v-if="!receivedOTP">
                        <form @submit.prevent="requestOTP">
                            <div class="input-div">
                                <label class="input-label" for="email">Enter Registered Email</label>
                                <input id="email" class="custom-input" type="email" v-model.trim="email" />
                                <div class="input-error">{{ emailError }}</div>
                            </div>
                            <div class="mt-3 flex justify-center">
                                <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none w-full">Request OTP</button>
                            </div>
                            <div class="text-center text-gray-600 mt-2">
                                <p>An OTP will be sent to the above email address</p>
                            </div>
                        </form>
                    </div>
                    <div v-else-if="!otpVerified">
                        <form @submit.prevent="submitOTP">
                            <div class="input-div">
                                <label class="input-label" for="otp">Enter OTP</label>
                                <input id="otp" class="custom-input" type="text" v-model.trim="otp" />
                                <div class="input-error">{{ otpError }}</div>
                            </div>
                            <div class="mt-3 flex justify-center">
                                <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none w-full">Verify OTP</button>
                            </div>
                            <div class="text-center text-gray-600 mt-2">
                                <p>Didn't receive OTP? <span class="underline" style="color: #667eea" @click="requestOTP">Resend OTP</span></p>
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <form @submit.prevent="changePassword">
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
                            <div class="input-div">
                                <label class="input-label" for="confirm-password">Confirm Password</label>
                                <input id="confirm-password" class="custom-input" type="password" v-model.trim="confirmPassword"/>
                                <div class="input-error">{{ confirmPasswordError }}</div>
                            </div>
                            <div class="mt-3 flex justify-center">
                                <button style="background-color: #667eea;" class="text-white font-bold rounded-lg py-4 px-8 uppercase tracking-wider focus:outline-none w-full">Change Password</button>
                            </div>
                        </form>
                    </div>
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
            confirmPassword: '',
            otp: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            otpError: '',
            rememberMe: false,
            receivedOTP: false,
            otpVerified: false,
            isLoading: false
        }
    },
    methods:{
        async requestOTP(){
            this.isLoading = true;
            this.emailError = '';
            const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            if(!emailPattern.test(this.email)){
                this.emailError = '*Please enter a valid email address';
                this.isLoading = false;
                return;
            }
            const status = await this.$store.dispatch('user/requestOTP',{ 
                body: {
                    email: this.email
                }
            });
            if(status === 200){
                this.receivedOTP = true;
                this.isLoading = false;
                // alert(this.$store.getters['user/getOTP']);
            }
        },
        submitOTP(){
            if(this.otp === ''){
                this.otpError = '*Please enter OTP';
                return;
            }
            if(Number(this.otp) === this.$store.getters['user/getOTP']){
                this.otpVerified = true;
            }else{
                this.otpError = "*Invalid OTP";
                this.otpVerified = false;
            }
        },
        async changePassword(){
            this.isLoading = true;
            this.emailError = '';
            this.passwordError = '';
            this.confirmPasswordError = '';

            const emailPattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
            if(!emailPattern.test(this.email)){
                this.emailError = '*Please enter a valid email address';
                return;
            }

            if(this.password==='' || this.password.length < 8){
                this.passwordError = '*Please enter a valid password';
                return
            }
            if(this.confirmPassword!==this.password){
                this.confirmPasswordError = '*Passwords do not match';
                return
            }

            const status = await this.$store.dispatch('user/changePassword',{
                body:{
                    email: this.email,
                    newPassword: this.password
                }
            });
            this.isLoading = false;
            if(status === 200){
                this.$router.replace('/login');
            }else if(status === 403){
                this.passwordError = '*New Password cannot be same as Old Password';
            }else{
                this.emailError = '*Account not found'
            }
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