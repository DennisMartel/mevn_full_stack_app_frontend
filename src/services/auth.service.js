import axios from "axios";
import TokenService from "./token.service";
import { destroyCookie } from "@/utils/cookiesUtils";
const URL = "/api/auth";

class AuthService {
    async signin({ email, password }) {
        const response = await axios.post(`${URL}/signin`, {
            email: email,
            password: password
        });
        return response.data;
    }

    async signup(payload) {
        const response = await axios.post(`${URL}/signup`, payload);
        return response.data;
    }

    async logout() {
        // const response = await axios.post(`${URL}/logout`);
        // return response.data;
        destroyCookie('access_token');
        destroyCookie('userInfo');
    }

    async refreshToken(payload) {
        const response = await axios.post(`${URL}/refresh-token`, {
            refreshToken: payload,
            userId: TokenService.getLocalUserInfo()
        });
        
        return response
    }
}

export default new AuthService();