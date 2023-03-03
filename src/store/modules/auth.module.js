import AuthService from "../../services/auth.service";

const initialState = () => ({
    signinApiStatus: "",
    signupApiStatus: ""
});

const getters = {
    getSigninApiStatus(state) {
        return state.signinApiStatus;
    },
    getSignupApiStatus(state) {
        return state.signupApiStatus;
    }
};

const actions = {
    signin({ commit }, payload) {
        return AuthService.signin(payload).then(
            response => {
                commit("signinApiStatus", "success");
                return Promise.resolve(response.data);
            },
            error => {
                commit("signinApiStatus", "failed");
                return Promise.reject(error);
            }
        )
        .catch(_error => {
            debugger;
            return Promise.reject(_error);
        })
    },
    signup({ commit }, payload) {
        return AuthService.signup(payload).then(
            response => {
                commit("signupApiStatus", "success");
                return Promise.resolve(response.data);
            },
            error => {
                commit("signupApiStatus", "failed");
                return Promise.reject(error);
            }
        )
        .catch(_error => {
            return Promise.reject(_error);
        })
    },
    refreshToken({ commit }, token) {
        commit("refreshToken", token);
    },
    logout({ commit }) {
        AuthService.logout();
        commit("logout");
    } 
};

const mutations = {
    setSigninApiStatus(state, payload) {
        state.signinApiStatus = payload;
    },
    setSignupApiStatus(state, payload) {
        state.signupApiStatus = payload;
    }
};

export default {
    namespaced: true,
    initialState,
    getters,
    actions,
    mutations
}