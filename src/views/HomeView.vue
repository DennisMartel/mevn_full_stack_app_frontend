<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate color="indigo" rounded class="mt-5"></v-progress-linear>
    <v-alert v-if="this.$router.params" type="success" title="Operación exitosa" :text="this.$router.params.message" />
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
          <v-img height="250" :src="`/${post.image}`" />
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
</template>

<script>
import * as posts from "../services/post.service";

export default {
  name: 'HomeView',
  data() {
    return {
      loading: false,
      posts: []
    };
  },
  async created() {
    this.loading = true;
    setTimeout(async () => {
      this.posts = await posts.getPosts();
      this.loading = false;
    }, 2500);
  }
};
</script>
