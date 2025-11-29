<template>
  <div class="settings-header">
    <el-form @submit.prevent="addNewCity" label-position="top">
      <el-form-item label="Add Location:" class="settings-input-container">
        <el-input
          v-model="newCityName"
          placeholder="Enter city name"
          @keyup.enter="addNewCity"
        >
          <template #append>
            <el-button 
              type="primary" 
              :icon="ArrowRight" 
              @click="addNewCity" 
              circle 
              :loading="isLoading"
            />
          </template>      
        </el-input>    
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { ElMessage, ElButton, ElInput, ElForm, ElFormItem } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import type { CityConfig } from '@/types/weather';
import { WeatherApi } from '@/utils/weatherApi';

const props = defineProps<{ existingCities: CityConfig[] }>();
const emit = defineEmits<{ (e: 'add-city', city: CityConfig): void }>();

const newCityName = ref('');
const isLoading = ref(false);

const addNewCity = async () => {
  const cityName = newCityName.value.trim();

  if (!cityName) {
    ElMessage.warning('Please enter a city name');
    return;
  }
  
  if (props.existingCities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
    ElMessage.warning('City already exists');
    return;
  }

  if (/^\d+$/.test(cityName)) {
    ElMessage.error('Invalid city name');
    return;
  }

  isLoading.value = true;
  const weatherApi = WeatherApi.getInstance();
  try {
    const cityData = await weatherApi.validateCity(cityName);
    if (cityData && cityData.name.toLowerCase().includes(cityName.toLowerCase())) {
      const newCity: CityConfig = {
        name: cityData.name,
        order: props.existingCities.length
      };
      emit('add-city', newCity);
      newCityName.value = '';
    } else {
      ElMessage.error('City not found');
    }
  } catch (error) {
    ElMessage.error('An error occurred while validating the city.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.settings-header {
  margin-top: auto;
}
</style>
