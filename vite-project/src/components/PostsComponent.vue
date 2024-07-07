<template>
    <div id="app">
        <h1>Posts from JSONPlaceholder</h1>
        <label for="postCount">Select number of posts:</label>
        <select v-model="postsPerPage" @change="fetchPosts">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PostsComponent',
    data() {
        return {
            posts: [],
            postsPerPage: 10
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${this.postsPerPage}`)
                .then(response => {
                    this.posts = response.data;
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }
};
</script>

<style>
#app {
    font-family: Arial, Helvetica, sans-serif;
    margin: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}
</style>
