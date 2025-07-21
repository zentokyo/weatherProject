import { defineStore } from "pinia";


    export const useWeatherStore = defineStore("weather", {
    state: () => ({
        weatherData: null,
        cityName: localStorage.getItem("cityName") || "Москва",
    }),

    actions: {
        async getWeatherData() {
            const url =
    `http://api.openweathermap.org/data/2.5/forecast?&units=metric&lang=ru&q=${this.cityName}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.weatherData = data;
                console.log("Данные получены:", data);
            } catch (error) {
                console.error("Произошла ошибка:", error);
            }
        },
    },
});
