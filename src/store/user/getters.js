export default {
    getUserId(state){
        return state.user.userId;
    },
    getFullName(state){
        return state.user.fullname;
    },
    getEmail(state){
        return state.user.email;
    },
    getContact(state){
        return state.user.contact;
    },
    isAuthenticated(state){
        return state.user.isAuthenticated;
    },
    getCurrentFolder(state){
        return state.user.currentFolder;
    },
    getOTP(state){
        return state.otp;
    }
}