import AxiosInstace from "../utils/AxiosInstanceUtils";
import TokenService from "@/services/token.service";
import AuthService from "@/services/auth.service";

const setupInterceptor = (store) => {
    AxiosInstace.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();
            if (token) config.headers["x-access-token"] = `${token}`;
            return config;
        },
        error => Promise.reject(error)
    );

    AxiosInstace.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalRequest = error.config;

            if (error.response.status == 401) {
                try {
                    const refreshToken = TokenService.getLocalRefreshToken();
                    const userId = TokenService.getLocalUserInfo();

                    const response = await AuthService.refreshToken(refreshToken, userId);
                    
                    if (response && response.status == 200) {
                        TokenService.updateLocalAccessToken(response.data.accessToken);
                        const authorization = `${TokenService.getLocalAccessToken()}`;
                        AxiosInstace.defaults.headers.common["x-access-token"] = authorization;
                        store.dispatch("auth/refreshToken", response.data.accessToken);
                        return AxiosInstace(originalRequest);
                    }
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }

        }
    )
}

export default setupInterceptor;