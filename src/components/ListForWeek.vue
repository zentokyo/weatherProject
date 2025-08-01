<script setup>

const props = defineProps({
    allWeatherData: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div>
        {{ allWeatherData }}
    </div>
</template>

<style scoped>

</style>