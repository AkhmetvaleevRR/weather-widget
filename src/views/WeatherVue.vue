<template>
  <div class="weather-content">
    <div class="city-selector">
      <el-select
        :model-value="currentCity"
        @update:modelValue="emit('update:currentCity', $event)"
        placeholder="Select city"
      >
        <el-option
          v-for="city in cities"
          :key="city.name"
          :label="city.name"
          :value="city.name"
        />
      </el-select>
    </div>
    <WeatherDisplay :weather-data="weatherData" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import WeatherDisplay from '../components/weather/WeatherDisplay.vue';
import type { CityConfig, WeatherData } from '@/types/weather';
import { ElSelect, ElOption } from 'element-plus';
import { defineProps, defineEmits } from 'vue';

defineProps<{
  cities: CityConfig[];
  currentCity: string;
  weatherData: WeatherData | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:currentCity', city: string): void;
}>();
</script>

<style scoped lang="scss">
.weather-content {
  padding: 20px;

  .city-selector {
    margin-bottom: 20px;

    :deep(.el-select) {
      width: 100%;
    }
  }
}
</style>
