import axios from "axios";
const URL = "/api/auth";

class AuthService {
    async signin({ email, password }) {
        const response = await axios.post(`${URL}/signin`, {
            email,
            password
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
}

export default new AuthService();