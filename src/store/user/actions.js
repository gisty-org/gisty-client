import axios from 'axios';

export default {
    login(context,payload){
        const status = axios.post(
            context.rootGetters.getUrl + '/login',
            payload.body,
            context.rootGetters.getConfig
        ).then((response) => {
            context.commit('setUser', response.data.user);
            context.commit('setAuth',{ isAuthenticated: true });
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated',context.getters.isAuthenticated);
            return response.status;
        }).catch(error => {
            return error.response.status;
        });

        return status;
    },
    async register(context,payload){
        
        if(payload.image){
            const formData = new FormData();
            formData.append('file', payload.image);
            formData.append('tags', 'profile image');
            formData.append('public_id',payload.body.email.split('@')[0])
            formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET);

            try{
                const response = await axios.post(
                    process.env.VUE_APP_CLOUDINARY_URL,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }  
                );
                payload.body.profile = response.data.secure_url;
            }catch(error){
                console.log(error);
            }
        }else{
            payload.body.profile = null;
        }

        
        try{
            const response = await axios.post(
                context.rootGetters.getUrl + '/register',
                payload.body,
                context.rootGetters.getConfig
            );
            context.commit('setUser',response.data.user);
            context.commit('setAuth',{ isAuthenticated: true });
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated',context.getters.isAuthenticated);
            return response.status;
        }catch(error){
            return error.response.status;
        }
    },
    logout(context){
        context.commit('setAuth',{ isAuthenticated: false });
        if(localStorage.getItem('user'))
            localStorage.removeItem('user');
        if(localStorage.getItem('isAuthenticated'))
            localStorage.removeItem('isAuthenticated');
        if(localStorage.getItem('rememberMe'))
            localStorage.removeItem('rememberMe');
    },
    async requestOTP(context,payload){
        const url = context.rootGetters.getUrl + '/request_otp';
        try{
            const response = await axios.post(
                url,
                payload.body,
                context.rootGetters.getConfig
            );
            context.commit('setOTP',{ otp: response.data.otp });
            return response.status;
        }catch(error){
            return error.response.status;
        }
    },
    async changePassword(context,payload){
        const url = context.rootGetters.getUrl + '/reset_password';
        try{
            const response = await axios.post(
                url,
                payload.body,
                context.rootGetters.getConfig
            );
            return response.status;
        }catch(error){
            return error.response.status;
        }
    },
    async getProfile(context){
        const url = context.rootGetters.getUrl + '/profile/' + context.rootGetters['user/getUserId'] + '/edit';
        try{
            const response = await axios.get(
                url
            );
            context.commit('setUser',response.data.user);
            return response.status;
        }catch(error){
            return error.response.status;
        }
    },
    async editProfile(context,payload){
        if(payload.image){
            const formData = new FormData();
            formData.append('file', payload.image);
            formData.append('tags', 'profile image');
            formData.append('public_id',payload.body.email.split('@')[0]);
            formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET);

            try{
                const response = await axios.post(
                    process.env.VUE_APP_CLOUDINARY_URL,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }  
                );
                payload.body.profile = response.data.secure_url;
            }catch(error){
                console.log(error);
            }
        }else{
            payload.body.profile = context.rootGetters['user/getProfile'];
        }

        const url = context.rootGetters.getUrl + '/profile/' + context.rootGetters['user/getUserId'];
        try{
            const response = await axios.put(
                url,
                payload.body,
                context.rootGetters.getConfig
            );
            context.commit('setUser',response.data.user);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            return response.status;
        }catch(error){
            return error.response.status;
        }
    }
}