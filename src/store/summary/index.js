import getters from './getters';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    namespaced: true,
    state(){
        return {
            summaries: null
        }
    },
    getters:getters,
    mutations: mutations,
    actions:actions
}