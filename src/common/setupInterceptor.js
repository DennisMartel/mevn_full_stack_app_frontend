import AxiosInstace from "../utils/AxiosInstanceUtils";
import TokenService from "@/services/token.service";
import AuthService from "@/services/auth.service";

const setupInterceptor = (store) => {
    AxiosInstace.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();
            if (token) config.headers["Bearer"] = token;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    AxiosInstace.interceptors.response.use(
        res => {
            return res;
        },
        async err => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/signin" && err.response) {
                // Access token was expired
                if (err.response.status == 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const token = await AuthService.refreshToken();

                        store.dispatch("auth/refreshToken", token);
                        TokenService.updateLocalAccessToken(token);

                        return AxiosInstace(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
        }
    )
}

export default setupInterceptor;