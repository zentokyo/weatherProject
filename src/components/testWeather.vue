<template>
    <div>
        <h1>Test Weather</h1>
    </div>
</template>

<script setup>
import { useWeatherStore } from "@/stores/weatherStore";
import { onMounted } from "vue";

const weatherStore = useWeatherStore(); 

onMounted(async () => {
    await weatherStore.getWeatherData();
});

</script>

<style scoped></style>
