import axios from "axios";
const URL = "/api/posts";

class PostService {
    async getPosts() {
        const res = await axios.get(URL);
        return res.data.posts;
    }

    async getPostById(id) {
        const res = await axios.get(`${URL}/${id}`);
        return res.data.post;
    }

    async setPost(payload) {
        const res = await axios.post(URL, payload);
        return res.data;
    }

    async updatePost(id, payload) {
        const res = await axios.put(`${URL}/${id}`, payload);
        return res.data;
    }

    async deletePost(id) {
        const res = await axios.delete(`${URL}/${id}`);
        return res.data;
    }
}

export default new PostService();