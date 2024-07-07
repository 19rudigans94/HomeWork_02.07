<template>
  <div id="app">
    <div>
      <h2>Posts</h2>
      <PostsComponent />
    </div>

    <div>
      <h2>Weather Forecast</h2>
      <WeatherForecast />
    </div>

    <div>
      <h2>Faind movies</h2>
      <GenreMovies genre="Action" />
    </div>

  </div>
</template>

<script>
import PostsComponent from './components/PostsComponent.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import GenreMovies from './components/GenreMovies.vue';

export default {
  name: 'App',
  components: {
    PostsComponent,
    WeatherForecast,
    GenreMovies,
  }
};
</script>

<style>
#app {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
}
</style>
