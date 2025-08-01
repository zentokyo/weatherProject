<template>
    <div class="flex items-center flex-col gap-10 h-screen mx-30">
        <SelectCity />

        <div v-if="!weatherStore.isLoading && curWeatherData && allWeatherData">
            <CurForecast :curWeatherData="curWeatherData" />
            <!-- <br />
            <ListForDay :allWeatherData="allWeatherData" />
            <br />
            <ListForWeek :allWeatherData="allWeatherData" /> -->
        </div>
        <div v-else="weatherStore.isLoading" class="m-auto relative">
            <div
                class="absolute size-12 border-5 rounded-full border-zinc-600"
            ></div>
            <div
                class="absolute size-12 border-5 rounded-full border-t-white border-transparent animate-spin"
            ></div>
        </div>
    </div>
</template>

<script setup>
import SelectCity from "@/components/selectCity.vue";
import CurForecast from "@/components/CurForecast.vue";
import ListForDay from "@/components/ListForDay.vue";
import ListForWeek from "@/components/ListForWeek.vue";

import { useWeatherStore } from "@/stores/weatherStore";
import { onMounted, reactive, ref, watch } from "vue";

const weatherStore = useWeatherStore();

const curWeatherData = ref(null);
const allWeatherData = ref(null);

onMounted(async () => {
    await weatherStore.getWeatherData();
    curWeatherData.value = weatherStore.curWeatherData;
    allWeatherData.value = weatherStore.allWeatherData;
});

watch(
    () => weatherStore.cityName,
    async () => {
        await weatherStore.getWeatherData();
        curWeatherData.value = weatherStore.curWeatherData;
        allWeatherData.value = weatherStore.allWeatherData;
    }
);
</script>

<style scoped></style>
