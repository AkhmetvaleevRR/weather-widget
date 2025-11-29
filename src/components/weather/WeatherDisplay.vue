<template>
  <div v-loading="loading" v-if="weatherData" class="weather-display">
    <div class="weather-main">
      <div class="weather-icon">
        <img
          :src="weatherApi.getWeatherIconUrl(weatherData.weather[0].icon)"
          :alt="weatherData.weather[0].description"
        />
      </div>
      <div class="temperature">
        {{ Math.round(weatherData.main.temp) }}°C
      </div>
    </div>

    <div class="weather-details">
      <div class="weather-description">
        <span class="label">Feels like:</span>
        <span class="value">{{ Math.round(weatherData.main.feels_like) }}°C</span>
        {{ weatherData.weather[0].description }}
      </div>

      <div class="weather-stats">
        <div class="stat-item">
          <span class="label"><el-icon><WindPower /></el-icon></span>
          <span class="value">{{ weatherData.wind.speed }} m/s</span>
        </div>
        <div class="stat-item">
          <span class="label"><el-icon><Stopwatch /></el-icon></span>
          <span class="value">{{ weatherData.main.pressure }} hPa</span>
        </div>
        <div class="stat-item">
          <span class="label">Humidity:</span>
          <span class="value">{{ weatherData.main.humidity }}%</span>
        </div>
        <div class="stat-item">
          <span class="label">Dew point:</span>
          <span class="value">{{ Math.round(weatherData.main.temp - ((100 - weatherData.main.humidity) / 5)) }}°C</span>
        </div>
        <div class="stat-item">
          <span class="label">Visibility:</span>
          <span class="value">{{ weatherData.visibility/1000 }} km</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeatherApi } from '@/utils/weatherApi';
import type { WeatherData } from '@/types/weather';
import { WindPower, Stopwatch } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { defineProps } from 'vue';

defineProps<{
  weatherData: WeatherData | null;
  loading: boolean;
}>();

const weatherApi = WeatherApi.getInstance();
</script>

<style scoped lang="scss">
.weather-display {
  .weather-main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .temperature {
      font-size: 48px;
      font-weight: 300;
      color: black;
    }

    .weather-icon {
      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .weather-details {
    .city-name {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #303133;
    }

    .weather-description {
      text-transform: capitalize;
      color: #606266;
      margin-bottom: 16px;
    }

    .weather-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      .stat-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;

        .label {
          color: #909399;
          font-size: 14px;
        }

        .value {
          color: #303133;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
