import axios from "axios";
const URL = "/api/posts";

export const getPosts = async () => {
    const res = await axios.get(URL);
    return res.data.posts;
}

export const getPostById = async id => {
    const res = await axios.get(`${URL}/${id}`);
    return res.data.post;
}

export const setPost = async payload => {
    const res = await axios.post(URL, payload);
    return res.data; 
}

export const updatePost = async (id, payload) => {
    const res = await axios.put(`${URL}/${id}`, payload);
    return res.data;
}

export const deletePost = async id => {
    const res = await axios.delete(`${URL}/${id}`);
    return res.data;
}