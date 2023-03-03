import { createStore } from "vuex";
import AuthModule from "./modules/auth.module";

const store = createStore({
    modules: {
        auth: AuthModule
    }
})

export default store;