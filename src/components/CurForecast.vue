<script setup>
import { h } from 'vue';

const props = defineProps({
    curWeatherData: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <section class="w-full flex justify-center gap-5">
        <div class="grid grid-rows-2 grid-flow-col *:*:first:text-xs *:*:first:text-gray-400 *:text-center *:py-2 *:px-4 *:border-r *:nth-last-[-n+2]:border-r-0 *:odd:border-b w-max h-30 rounded-xl shadow-card shadow-black/20 text-white text-xl">
            <div class="">
                <div class=" ">
                    Ощущение:
                </div>
                <div class="">
                    {{ Math.round(curWeatherData.main.feels_like) }}°C
                </div>
            </div>
            <div class="">
                <div class=" ">
                    Влажность:
                </div>
                <div class="">
                    {{ curWeatherData.main.humidity }}%
                </div>
            </div>
            <div class="">
                <div class=" ">
                    Скорость ветра:
                </div>
                <div class="">
                    {{ Math.round(curWeatherData.wind.speed) }} м/с
                </div>
            </div>
            <div class="">
                <div class=" ">
                    Облачность:
                </div>
                <div class="">
                    {{ Math.round(curWeatherData.clouds.all) }}%
                </div>
            </div>
        </div>
        <div class="w-40 h-30 rounded-xl shadow-card shadow-black/20 text-white text-xl">
            <div class="pt-4 pl-4 flex">
                <span class="text-4xl font-bold">{{ Math.round(curWeatherData.main.temp) }}</span> °C
                <picture><img class="pl-2" :src="' https://openweathermap.org/img/wn/' + curWeatherData.weather[0].icon + '.png'" alt="weather icon"></picture>
            </div> 
            <p class="text-lg pt-1 pl-4 font-normal leading-4">{{ curWeatherData.weather[0].description }}</p>        
        </div>
        
        <div class="w-max h-30 rounded-xl shadow-card shadow-black/20 text-white text-xl px-4 py-2">
            <h3 :class="(!curWeatherData.rain && !curWeatherData.snow) ? 'py-10' : ''"> {{ (!curWeatherData.rain && !curWeatherData.snow) ? "Осадков нет" : "Осадки:" }} </h3>
            <div class="*:text-sm *:pt-2">
                <div v-if="curWeatherData.rain" class="">дождевые осадки: {{ curWeatherData.rain["1h"] }} мм/ч</div>
                <div v-if="curWeatherData.snow" class="">снежные осадки: {{ curWeatherData.snow["1h"] }} мм/ч</div>
                <!-- <div v-if="!curWeatherData.rain && !curWeatherData.snow" class="">Осадков нет</div> -->
            </div>
        </div>
    </section>
</template>

<style scoped></style>
