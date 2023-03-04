import AuthService from "../../services/auth.service";
import TokenService from "@/services/token.service";

const user = JSON.parse(localStorage.getItem('user'));

const state = () => ({
    signinApiStatus: "",
    signupApiStatus: "",
    user: user ? { status: { loggedIn: true }, user: user } : { status: { loggedIn: false }, user: null }
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
                if (response) {
                    commit("setsigninApiStatus", "success");
                    TokenService.setUser(response);
                    return Promise.resolve(response);
                }
            },
            error => {
                commit("setsigninApiStatus", "failed");
                return Promise.reject(error);
            }
        )
        .catch(_error => {
            return Promise.reject(_error);
        })
    },
    signup({ commit }, payload) {
        return AuthService.signup(payload).then(
            response => {
                commit("setsignupApiStatus", "success");
                return Promise.resolve(response);
            },
            error => {
                commit("setsignupApiStatus", "failed");
                return Promise.reject(error);
            }
        )
        .catch(_error => {
            return Promise.reject(_error);
        })
    },
    refreshToken({ commit }, accessToken) {
        commit('refreshToken', accessToken);
    },
    logout({ commit }) {
        AuthService.logout();
        commit("logout");
    } 
};

const mutations = {
    setsigninApiStatus(state, payload) {
        state.signinApiStatus = payload;
    },
    setsignupApiStatus(state, payload) {
        state.signupApiStatus = payload;
    },
    refreshToken(state, accessToken) {
        state.status.loggedIn = true;
        state.user = { ...state.user, accessToken: accessToken };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}