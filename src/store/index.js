import { createStore } from 'vuex';
import userModule from './user/index';
import summaryModule from './summary/index';

const store = createStore({
    modules:{
        user: userModule,
        summary: summaryModule
    },
    state(){
        return {
            url: process.env.VUE_APP_API_BASE_URL,
            config: {
                headers: {
                    ContentType: 'application/json'
                }
            }
        }
    },
    getters:{
        getUrl(state){
            return state.url;
        },
        getConfig(state){
            return state.config;
        },
    }
});

export default store;