<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <v-list-item>
                <v-list-item-title>
                    DennisMartel
                </v-list-item-title>
                <v-list-item-subtitle>
                    MEVN Full Stack App
                </v-list-item-subtitle>
                <p>&nbsp;</p>
            </v-list-item>
            <v-divider />
            <v-list density="compact">
                <v-list-subheader>REPORTS</v-list-subheader>

                <v-list-item v-for="(item, i) in items" color="indigo" :key="i" :value="item" :to="item.link">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :elevation="2">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Blog Superheroes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon color="indigo" v-bind="props">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                </template>
                <v-list :elevation="4">
                    <v-list-item v-for="(item, index) in authItemsLink" :key="index" :value="index" :to="item.link">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-main>
            <slot></slot>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    name: "App",
    data: () => ({
        drawer: null,
        items: [
            { title: 'Inicio', icon: 'mdi-home', link: "/" },
            { title: 'Crear post', icon: 'mdi-note-plus', link: "/add-post" },
            { title: 'Información', icon: 'mdi-help-box', link: "/about" },
        ],
        authItemsLink: [
            { title: 'Iniciar sesión', icon: 'mdi-home', link: "/auth/sign-in" },
            { title: 'Registrate', icon: 'mdi-note-plus', link: "/auth/sign-up" },
        ]
    }),
}
</script>