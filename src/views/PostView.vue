<template>
    <v-container>
        <v-progress-linear v-if="loading" indeterminate color="indigo" rounded class="mt-5"></v-progress-linear>
        <v-row no-gutters v-if="!loading">
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`" />
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1">
                            <v-col sm="2">
                                <v-btn small variant="outlined" color="primary">{{ post.category }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn small variant="outlined" color="success" text>Editar</v-btn>
                                <v-btn small variant="outlined" color="red" @click="removePost(post._id)"
                                    text>Eliminar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        {{ post.title }}
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{ post.content }}</p>
                        <p>{{ post.createdAt }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as posts from "../services/post.service";

export default {
    data() {
        return {
            loading: false,
            post: {},
        };
    },
    async created() {
        this.loading = true;
        setTimeout(async () => {
            this.post = await posts.getPostById(this.$route.params.id)
            this.loading = false;
        }, 2500);
    },
    methods: {
        async removePost(id) {
            await posts.deletePost(id);
            this.$router.push({ name: "home" });
        }
    }
}
</script>