<template>
  <App>
    <v-container>
      <v-progress-linear v-if="loading" indeterminate color="indigo" rounded class="mt-5"></v-progress-linear>
      <v-alert closable v-if="messageSuccess" type="success" :title="messageSuccess" />
      <v-row no-gutters>
        <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
          <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
            <v-img height="200" :src="`/${post.image}`" />
            <v-btn class="ml-4 mt-3" small variant="outlined" color="indigo">
              {{ post.category }}
            </v-btn>
            <v-card-title class="headline">
              {{ post.title }}
            </v-card-title>
            <v-card-text class="py-0">
              <p>{{ `${post.content.substring(0, 100)}...` }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </App>
</template>

<script>
import PostService from "@/services/post.service";
import App from "./App/index.vue";

export default {
  name: 'HomeView',
  components: {
    App
  },
  data() {
    return {
      loading: false,
      posts: []
    };
  },
  async created() {
    this.loading = true;
    setTimeout(async () => {
      this.posts = await PostService.getPosts();
      this.loading = false;
    }, 2500);
  },
  computed: {
    messageSuccess() {
      return this.$route.params.message;
    }
  }
};
</script>
