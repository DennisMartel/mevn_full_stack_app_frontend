<template>
  <router-view />
</template>

<script>
  import EventBus from './common/EventBus';
  import { routesConfig } from './common/routesConfig';

  export default {
    methods: {
      logOut() {
        store.dispatch("auth/logout");
        this.$router.push(routesConfig.SIGNIN);
      }
    },
    mounted() {
      EventBus.on("logout", () => {
        debugger;
        this.logOut();
      })
    },
    beforeDestroy() {
      EventBus.remove("logout");
    },
  }
</script>

<style>

</style>