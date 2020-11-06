import getters from './getters';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state(){
        return {
            user:{
                userId: null,
                username: '',
                fullname: '',
                email: '',
                contact: '',
                isAuthenticated: false,
                currentFolder: ''
            },
            otp: null,
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}