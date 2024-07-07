<template>
    <div class="film-card">
        <div class="card">
            <img :src="movie.Poster" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
                <h5 class="card-title">{{ movie.Title }}</h5>
                <p class="card-text">Year: {{ movie.Year }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: Object
    }
};
</script>

<style scoped>
.film-card {
    width: 300px;
    margin: 20px;
}

.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
}

.card-img-top {
    width: 100%;
    height: auto;
}

.card-body {
    padding: 15px;
}
</style>
