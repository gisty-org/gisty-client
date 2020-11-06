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
            url: 'https://gisty-server.herokuapp.com/api',
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