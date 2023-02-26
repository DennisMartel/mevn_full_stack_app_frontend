<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <v-list-item-title>
          DCodeMania
        </v-list-item-title>
        <v-list-item-subtitle>
          MEVN Full Stack App
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider />
      <v-list density="compact">
        <v-list-subheader>REPORTS</v-list-subheader>

        <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary" :to="item.link" link>
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>DCodeMania</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Inicio', icon: 'mdi-home', link: "/" },
      { title: 'Crear post', icon: 'mdi-note-plus', link: "/add-post" },
      { title: 'Información', icon: 'mdi-help-box', link: "/about" },
    ],
  }),
}
</script>