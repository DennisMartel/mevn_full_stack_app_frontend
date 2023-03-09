import {
    getCookie,
    setCookie,
    destroyCookie
} from "../utils/cookiesUtils";

class TokenService {
    getLocalRefreshToken() {
        return getCookie("access_token");
    }

    getLocalAccessToken() {
        return getCookie("access_token");
    }

    updateLocalAccessToken(token) {
        setCookie("access_token", token);
    }

    getTokenAccess() {
        return getCookie("access_token");
    }

    setTokenAccess(token) {
        setCookie("access_token", token);
    }

    removeTokenAccess() {
        destroyCookie("access_token");
    }

    getLocalUserInfo() {
        return getCookie("user_info");
    }

    setLocalUserInfo(userInfo) {
        setCookie("user_info", userInfo);
    }
    removeTokenUserInfo() {
        destroyCookie("user_info");
    }
}

export default new TokenService();