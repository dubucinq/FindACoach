export default { 
    userId(state) {
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token; //convert to a true boolean
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    },
};