<template>
    <div class="flex justify-center">
        <h1 class="text-white font-medium text-2xl">
            Прогноз погоды для города:
            <span
                class="font-bold cursor-pointer inline-flex"
                @click="getCitiesNames()"
            >
                {{ weatherStore.cityName }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </span>
        </h1>
    </div>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weatherStore";
import { ref } from "vue";

const weatherStore = useWeatherStore();

const citySelectorShow = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Владивосток",
];

const allCities = [];

async function getCitiesNames() {
    if (allCities.length !== 0) {
        // console.log("allCities существует");
        return;
    }
    try {
        const response = await fetch(
            "https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/fc45a3c3886e54835f510324c7baa3af0f174cd7/russia"
        );
        const data = await response.json();
        const allCitiesFetch = data;
        // console.log(typeof(data));
        allCitiesFetch.forEach((el) => {
            allCities.push(el.city);
        });
        // console.log('Города:', allCities);
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}
</script>

<style scoped></style>
