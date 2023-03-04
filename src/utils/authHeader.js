import VueCookies from "vue-cookies"

export const authHeader = () => {
    const user = VueCookies.VueCookies.get("user");

    if (user && user.token && user.token.user_token) {
        return { Authorization: `Bearer ${user.token.user_token}` };
    }

    return {};
}