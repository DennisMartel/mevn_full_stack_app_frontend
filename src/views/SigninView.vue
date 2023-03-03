<template>
    <v-app>
        <div class="background-cover"></div>
        <v-main class="d-flex justify-center align-center">
            <v-col cols="10" lg="4" class="mx-auto">
                <v-card class="pa-4" elevation="2">
                    <div class="text-center">
                        <v-avatar color="indigo lighten-4" size="60">
                            <v-icon icon="mdi-account" size="35" />
                        </v-avatar>
                        <h2 class="mt-5">Ingresa a tu cuenta</h2>
                    </div>
                    <v-form @submit.prevent="signinForm" ref="signinForm">
                        <v-card-text>
                            <v-text-field 
                                type="email"
                                label="Correo electrónico"
                                placeholder="Ingresa tu correo electrónico"
                                prepend-inner-icon="mdi-email"
                                variant="underlined"
                                color="indigo"
                                v-model="email"
                                :rules="rulesEmail"
                            />
                            <v-text-field 
                                :type="!showPassword ? 'password' : 'text'"
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                variant="underlined"
                                color="indigo"
                                v-model="password"
                                :rules="rulesPassword"
                                @click:append-inner="showPassword = !showPassword"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn type="submit" class="bg-indigo w-100 mx-auto" color="white">Iniciar sesión</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            showPassword: false,
            email: "",
            password: "",
            rulesEmail: [
                value => !!value || "El correo electrónico es obligatorio",
            ],
            rulesPassword: [
                value => !!value || "La contraseña es obligatoria",
            ]
        }
    },
    computed: {
        ...mapGetters("auth", {
            getSigninApiStatus: "getSigninApiStatus"
        })
    },  
    methods: {
        ...mapActions("auth", {
            signin: "signin"
        }),
        async signinForm() {
            const payload = {
                email: this.email,
                password: this.password
            }

            if (this.$refs.signinForm.validate()) {
                this.signin(payload);

                if (this.getSigninApiStatus == "success") {
                    this.$router.push({ name: "home" });
                } else {
                    
                }
            }
        }
    }
}
</script>

<style>
    .background-cover {
        position: absolute;
        top: 0;
        background-image: url(../assets/bg-cover.webp);
        height: 50%;
        width: 100%;
        display: block;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>