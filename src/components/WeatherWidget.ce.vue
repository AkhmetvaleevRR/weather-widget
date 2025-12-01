<template>
  <div class="weather-widget" ref="widgetRef" :style="{ height: widgetHeight }">
    <div class="widget-header">   
      <div class="city-name" v-if="weatherData && !showSettings">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </div>
      <el-button 
        type="info" 
        :icon="showSettings ? Close : Setting" 
        link
        @click="showSettings = !showSettings"
        class="widget-header__button"
      />
    </div>

    <div>
      <SettingsVue
        v-if="showSettings"
        v-model="cities"
        @update:modelValue="handleCitiesUpdate"
      />
      <WeatherView
        v-else
        :cities="cities"
        :current-city="currentCity"
        :weather-data="weatherData"
        :loading="loading"
        @update:current-city="handleCityChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { ElMessage, ElButton } from 'element-plus';
import { Setting, Close } from '@element-plus/icons-vue';
import SettingsVue from '../views/SettingsVue.vue';
import WeatherView from '../views/WeatherVue.vue';

import { WeatherApi } from '@/utils/weatherApi';
import { LocalStorageManager } from '@/utils/localStorage';
import type { WeatherData, CityConfig, WidgetConfig } from '@/types/weather';
import elementPlusStyles from 'element-plus/dist/index.css?inline';
import { componentStyles } from '@/styles/component-styles';



 
const weatherApi = WeatherApi.getInstance();

const widgetRef = ref<HTMLElement | null>(null);
const widgetHeight = ref<string>('auto');
const showSettings = ref(false);
const loading = ref(false);
const error = ref('');
const weatherData = ref<WeatherData | null>(null);
const cities = ref<CityConfig[]>([]);
const currentCity = ref('');

const loadConfig = () => {
  const savedConfig = LocalStorageManager.getConfig();
  if (savedConfig) {
    cities.value = savedConfig.cities;
    currentCity.value = savedConfig.currentCity;
  }
};

const saveConfig = () => {
  const config: WidgetConfig = {
    cities: cities.value,
    currentCity: currentCity.value
  };
  LocalStorageManager.saveConfig(config);
};

const handleCitiesUpdate = async (newCities: CityConfig[]) => {
  try {
    cities.value = newCities.map((city, index) => ({ ...city, order: index }));
    saveConfig();

    if (!cities.value.some(city => city.name === currentCity.value)) {
      const newCurrentCity = cities.value[0]?.name || '';
      if (newCurrentCity) {
        currentCity.value = newCurrentCity;
        if (!showSettings.value) {
          loadWeatherData(newCurrentCity);
        }
      }
    }
  } catch (error) {
    ElMessage.error('City not found or API error');
  }
};

const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      () => {
        reject(new Error('Unable to retrieve location'));
      }
    );
  });
};

const handleCityChange = (newCity: string) => {
  currentCity.value = newCity;
};

const loadWeatherData = async (city?: string) => {
  const targetCity = city || currentCity.value;
  if (!targetCity) return;

  loading.value = true;
  error.value = '';

  try {
    const data = await weatherApi.getWeatherByCityName(targetCity);
    weatherData.value = data;
    currentCity.value = data.name;
    saveConfig();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load weather data';
    ElMessage.error(error.value);
  } finally {
    loading.value = false;
  }
};

const loadWeatherByLocation = async () => {
  try {
    const location = await getUserLocation();
    const data = await weatherApi.getWeatherByCoords(location.lat, location.lon);
    weatherData.value = data;
    currentCity.value = data.name;
    
    if (!cities.value.some(city => city.name === data.name)) {
      cities.value.push({
        name: data.name,
        order: cities.value.length,
        lat: location.lat,
        lon: location.lon
      });
      saveConfig();
    }
  } catch (err) {
    console.warn('Failed to get location, using default city');
    await loadWeatherData();
  }
};

onMounted(async () => {
  // Костыль для стилей Element Plus
  nextTick(() => {
    if (widgetRef.value) {
      const shadowRoot = widgetRef.value.getRootNode() as ShadowRoot;
      const targetElement = (shadowRoot && shadowRoot.host) ? shadowRoot : widgetRef.value;
      
      if (elementPlusStyles) {
        const elementStyleEl = document.createElement('style');
        elementStyleEl.textContent = elementPlusStyles;
        targetElement.appendChild(elementStyleEl);
      }
      
      if (componentStyles) {
        const componentStyleEl = document.createElement('style');
        componentStyleEl.textContent = componentStyles;
        targetElement.appendChild(componentStyleEl);
      }
    }
  });
  
  loadConfig();
  if (cities.value.length === 0) {
    await loadWeatherByLocation();
  } else {
    await loadWeatherData();
  }
});

watch(currentCity, (newCity) => {
  if (newCity && !showSettings.value) {
    loadWeatherData(newCity);
  }
});

watch(showSettings, (isSettingsVisible) => {
  if (widgetRef.value) {
    if (isSettingsVisible) {
      widgetHeight.value = `${widgetRef.value.offsetHeight}px`;
    } else {
      nextTick(() => {
        widgetHeight.value = 'auto';
      });
    }
  }
});
</script>

<style scoped lang="scss">
.weather-widget {
  width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  overflow: hidden;

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    color: black;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    &__button {
      margin-left: auto;
      font-size: 18px;
    }
  }

  .loading, .error {
    padding: 40px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .el-icon {
      font-size: 24px;
    }
  }
}
</style>

