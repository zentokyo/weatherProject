import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
    state: () => ({
        cityName: localStorage.getItem("cityName") || "Москва",

        curWeatherData: null,
        allWeatherData: null,

        isLoading: true,
    }),

    getters: {},

    actions: {
        changeCityName(newCityName) {
            this.cityName = newCityName;
            localStorage.setItem("cityName", newCityName);
        },


        async getWeatherData() {
            this.isLoading = true;

            const urls = [
                `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${
                    this.cityName
                }&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
                `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&q=${
                    this.cityName
                }&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
            ];

            try {
                const response = await Promise.all(
                    urls.map((url) =>
                        fetch(url).then((response) => response.json())
                    )
                );
                this.curWeatherData = response[0];
                this.allWeatherData = response[1];
                console.log("Данные получены:", response);
                
            } catch (error) {
                this.error = error.message;
                console.error("Ошибка при получении данных:", error);
            } finally{
                this.isLoading = false
            }
        },
    },
});
