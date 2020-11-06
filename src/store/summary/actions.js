import axios from 'axios';

export default {
    async loadData(context){
        const url = context.rootGetters.getUrl + '/summaries/' + context.rootGetters['user/getUserId'];
        try {
            const response = await axios.get(
                url
            );
            context.commit('setSummaries', response.data);
            return response.status;
        } catch (error) {
            return error.response.status;
        }
    },
    async deleteSnapshot(context,payload){
        const url = context.rootGetters.getUrl + '/summaries/' + payload.summaryId + '/snapshots/' + payload.snapshotId;
        try {
            const response = await axios.delete(
                url
            );
            await context.dispatch('loadData');
            return response.status;
        } catch (error) {
            return error.response.status;
        }
    },
    async deleteSummary(context,payload){
        const url = context.rootGetters.getUrl + '/summaries/' + payload.summaryId;
        try{
            const response = await axios.delete(
                url
            );
            await context.dispatch('loadData');
            return response.status;
        } catch(error){
            return error.response.status;
        }
    },
    async shareSummary(context,payload){
        const url = context.rootGetters.getUrl + '/summaries/share';
        try{
            let body = {
                from: context.rootGetters['user/getEmail'],
                to: payload.email,
                title: payload.title,
                content: payload.content,
                folder: 'shared',
                snapshots: payload.snapshots
            };
            const response = await axios.post(
                url,
                body,
                context.rootGetters.getConfig
            );
            return response.status;
        }catch(error){
            return error.response.status;
        }
    }
}