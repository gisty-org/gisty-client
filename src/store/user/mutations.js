export default {
    setUser(state,payload){
        state.user.userId = payload.userId
        state.user.fullname = payload.fullname;
        state.user.email = payload.email;
        state.user.contact = payload.contact;
    },
    setAuth(state,payload){
        state.user.isAuthenticated = payload.isAuthenticated;
    },
    setCurrentFolder(state,payload){
        state.user.currentFolder = payload.currentFolder;
    },
    setOTP(state,payload){
        state.otp = payload.otp;
    }
}