<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-0">
                    <v-card-title>Agregar nuevo post</v-card-title>
                    <v-divider />
                    <v-form @submit.prevent="submitForm" ref="form" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Titulo" v-model="post.title" variant="underlined" color="indigo"
                            prepend-icon="mdi-note" :rules="rules" />
                        <v-text-field label="Categoria" v-model="post.category" variant="underlined" color="indigo"
                            prepend-icon="mdi-view-list" :rules="rules" />
                        <v-textarea label="Descripción" v-model="post.content" variant="underlined" rows="4" no-resize
                            color="indigo" prepend-icon="mdi-note-plus" :rules="rules" />
                        <v-file-input @change="selectImage" ref="image" accept="image/*" :rules="rules" variant="underlined" color="indigo" chips
                            show-size counter label="Elige una imagen" />
                        <v-btn type="submit" class="mt-3" color="indigo">Agregar post</v-btn>
                    </v-form>
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
            rules: [value => !!value || "Este campo es requerido!"],
            post: {
                title: "",
                category: "",
                content: "",
                image: ""
            },
            image: ""
        };
    },
    methods: {
        selectImage() {
            this.image = this.$refs.image.files[0];
        },
        async submitForm() {
            const formData = new FormData();
            formData.append("image", this.image);
            formData.append("title", this.post.title);
            formData.append("category", this.post.category);
            formData.append("content", this.post.content);

            if (this.$refs.form.validate()) {
                const res = await posts.setPost(formData);
                this.$router.push({ name: "home", params: { message: res.message }});
            }
        }
    }
}
</script>