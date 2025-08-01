<script setup>
import { useWeatherStore } from "@/stores/weatherStore";
import { computed, ref } from "vue";

const weatherStore = useWeatherStore();

const defaultCities = ref([
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Владивосток",
]);

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
            if (!allCities.includes(el.city) && !el.city.includes("("))
                allCities.push(el.city);
        });
        // console.log('Города:', allCities);
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}

const isOpenSelector = ref(false);
const queryCity = ref("");

function toggleSelector() {
    isOpenSelector.value = !isOpenSelector.value;
    if (isOpenSelector.value) {
        setTimeout(() => {
            searchInput.value.focus();
        }, 0);
    }
    // console.log(isOpenSelector.value);
    if (isOpenSelector.value) getCitiesNames();
}

const searchInput = ref(null);

const checkQueryCity = computed(() => {
    const query = queryCity.value.toLowerCase();

    const citySelectorShow = ref([]);

    citySelectorShow.value =
        query.length > 0
            ? allCities.filter((city) => city.toLowerCase().includes(query))
            : defaultCities.value;

    if (!query) return citySelectorShow.value;

    // console.log("citySelectorShow.value", citySelectorShow.value);

    return citySelectorShow.value;
});

function selectCity(city) {
    weatherStore.changeCityName(city);
    isOpenSelector.value = false;
    queryCity.value = "";
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".selector-container")) {
        isOpenSelector.value = false;
        queryCity.value = "";
    }
});
</script>

<template>
    <div class="mt-4 text">
        <div class="relative selector-container">
            <h1 class="text-white font-medium text-2xl text-center">
                Прогноз погоды для города:
                <span
                    class="font-bold cursor-pointer inline-flex"
                    @click="toggleSelector"
                >
                    {{ weatherStore.cityName }}
                    <svg
                        :class="{ 'rotate-180': isOpenSelector }"
                        class="transition-transform duration-300"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="white"
                    >
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </span>
            </h1>

            <transition name="fade" mode="out-in">
                <div
                    v-show="isOpenSelector"
                    class="absolute right-0 z-10 w-50 mt-2 bg-white rounded-md shadow-lg"
                >
                    <input
                        @keyup.enter="selectCity(checkQueryCity[0])"
                        ref="searchInput"
                        v-model="queryCity"
                        type="text"
                        placeholder="Введите название города"
                        id="city-search"
                        name="city"
                        class="text-gray-700 text-xs w-full p-2 focus:outline-none"
                    />

                    <TransitionGroup
                        tag="ul"
                        name="list"
                        class="max-h-50 overflow-y-scroll focus:outline-none transition duration-300 divide-y-1 divide-solid divide-gray-200"
                    >
                        <li
                            @click="selectCity(city)"
                            v-for="city in checkQueryCity"
                            :key="city"
                            class="p-2 cursor-pointer hover:bg-gray-100 hover:rounded-xl"
                        >
                            {{ city }}
                        </li>
                    </TransitionGroup>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active {
    transition: all 0.3s ease-out;
}
.fade-leave-active {
    transition: all 0.2s ease-in;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
.list-move {
    transition: transform 0.3s ease;
}
</style>
