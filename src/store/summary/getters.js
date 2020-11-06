export default {
    getSubjects(state){
        let subjects = [];
        for(var subject in state.summaries){
            subjects.push(subject);
        }
        return subjects.sort();
    },
    getSummaries(state){
        return state.summaries;
    }
}