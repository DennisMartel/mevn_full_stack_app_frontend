import axios from "axios";
import TokenService from "./token.service";
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
        const response = await axios.post(`${URL}/logout`);
        return response.data;
    }

    async refreshToken() {
        const response = await axios.post(`${URL}/refresh-token`, {
            refreshToken: TokenService.getLocalRefreshToken()
        });

        const { token } = response.data;
        
        return token.user_token
    }
}

export default new AuthService();