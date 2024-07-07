<template>
    <div class="genre-movies">
        <h2>{{ searchQuery ? `Фильмы, содержащие слово "${searchQuery}"` : 'Все фильмы' }}</h2>
        <label for="searchInput">Введите ключевое слово для поиска:</label>
        <input type="text" id="searchInput" v-model="searchQuery" @keyup.enter="fetchMovies">
        <button @click="fetchMovies">Поиск</button>

        <button @click="toggleSortByYear">Сортировать по году</button>

        <ul v-if="movies.length > 0" class="film-list">
            <film-card v-for="movie in movies" :key="movie.imdbID" :movie="movie"></film-card>
        </ul>
        <p v-else>Фильмы не найдены.</p>
    </div>
</template>

<script>
import axios from 'axios';
import FilmCard from './FilmCard.vue';

const apiKey = '13fcb712';

export default {
    components: {
        FilmCard
    },
    data() {
        return {
            searchQuery: '',
            movies: [],
            sortByYear: false
        };
    },
    methods: {
        fetchMovies() {
            axios.get(`http://www.omdbapi.com/?s=${this.searchQuery}&apikey=${apiKey}&type=movie`)
                .then(response => {
                    console.log(response.data);
                    if (response.data.Response === 'True') {
                        this.movies = response.data.Search;

                        if (this.sortByYear) {
                            this.movies.sort((a, b) => b.Year - a.Year);
                        }
                    } else {
                        this.movies = [];
                    }
                })
                .catch(error => {
                    console.error('Ошибка при получении фильмов:', error);
                    this.movies = [];
                });
        },
        toggleSortByYear() {
            this.sortByYear = !this.sortByYear;
            this.fetchMovies();
        }
    }
};
</script>

<style scoped>
.film-list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    margin-top: 20px;
}

.genre-movies {
    margin: 20px;
}
</style>
