<template>
    <div class="weather-forecast">
        <h2>Прогноз погоды для {{ city }}</h2>

        <label for="city">Введите название города:</label>
        <input type="text" id="city" v-model="cityInput" @keyup.enter="fetchWeather">
        <button @click="fetchWeather">Получить погоду</button>

        <!-- Погода на сегодня -->
        <h3>Погода на сегодня</h3>
        <div v-if="weatherToday">
            <p>{{ weatherToday.description }}</p>
            <p>Температура: {{ weatherToday.temp }} &#8451;</p>
            <p>Ощущается как: {{ weatherToday.feelsLike }} &#8451;</p>
            <img :src="getWeatherIcon(weatherToday.icon)" alt="Weather Icon">
        </div>

        <!-- Погода на неделю -->
        <h3>Прогноз погоды на неделю</h3>
        <ul class="weather-list">
            <li v-for="(day, index) in weatherWeek" :key="index">
                <p>{{ day.dayOfWeek }}</p>
                <p>{{ day.description }}</p>
                <p>Температура: {{ day.temp }} &#8451;</p>
                <img :src="getWeatherIcon(day.icon)" alt="Weather Icon">
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WeatherForecast',
    data() {
        return {
            cityInput: '',
            city: '',
            weatherToday: null,
            weatherWeek: []
        };
    },
    methods: {
        fetchWeather() {
            // Запрос погоды на сегодня
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&units=metric&lang=ru&appid=e00cf9b719f0587af6f53730615b8058`)
                .then(response => {
                    this.city = response.data.name;
                    this.weatherToday = {
                        description: response.data.weather[0].description,
                        temp: response.data.main.temp,
                        feelsLike: response.data.main.feels_like,
                        icon: response.data.weather[0].icon
                    };
                })
                .catch(error => {
                    console.error('Ошибка при получении текущей погоды:', error);
                });

            // Запрос прогноза погоды на неделю
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityInput}&units=metric&lang=ru&appid=e00cf9b719f0587af6f53730615b8058`)
                .then(response => {
                    const dailyData = response.data.list.filter(item => item.dt_txt.includes('12:00:00'));
                    this.weatherWeek = dailyData.map(item => ({
                        dayOfWeek: new Date(item.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'long' }),
                        description: item.weather[0].description,
                        temp: item.main.temp,
                        icon: item.weather[0].icon
                    }));
                })
                .catch(error => {
                    console.error('Ошибка при получении прогноза погоды:', error);
                });
        },
        getWeatherIcon(icon) {
            return `http://openweathermap.org/img/wn/${icon}.png`;
        }
    }
};
</script>

<style scoped>
.weather-forecast {
    font-family: Arial, sans-serif;
    margin: 20px;
}

.weather-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    overflow-x: auto;
}

.weather-list li {
    flex: 0 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
}
</style>
