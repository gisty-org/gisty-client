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
    register(context,payload){
        const status = axios.post(
            context.rootGetters.getUrl + '/register',
            payload.body,
            context.rootGetters.getConfig
        ).then(response => {
            context.commit('setUser',response.data.user);
            context.commit('setAuth',{ isAuthenticated: true });
            localStorage.setItem('user',JSON.stringify(response.data.user));
            localStorage.setItem('isAuthenticated',context.getters.isAuthenticated);
            return response.status;
        }).catch(error => {
            return error.response.status;
        });
        return status;
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