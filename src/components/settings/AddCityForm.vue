<template>
  <div class="settings-header">
    <el-form ref="formRef" :model="formData" :rules="rules" @submit.prevent="addNewCity" label-position="top">
      <el-form-item label="Add Location:" prop="cityName" class="settings-input-container">
        <el-input
          v-model.trim="formData.cityName"
          placeholder="Enter city name"
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
import { ref, reactive, defineEmits, defineProps } from 'vue';
import { ElMessage, ElButton, ElInput, ElForm, ElFormItem } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import type { CityConfig } from '@/types/weather';
import { WeatherApi } from '@/utils/weatherApi';
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{ existingCities: CityConfig[] }>();
const emit = defineEmits<{ (e: 'add-city', city: CityConfig): void }>();

const formRef = ref<FormInstance>();
const isLoading = ref(false);

const formData = reactive({
  cityName: ''
});

const validateCityName = (rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback();
    return;
  }
  
  if (!/^[a-zA-Z\s-]+$/.test(value)) {
    callback(new Error('City name can only contain letters, spaces and hyphens'));
    return;
  }
  
  callback();
};

const rules: FormRules = {
  cityName: [
    { required: true, message: 'Please enter a city name', trigger: 'blur' },
    { min: 2, message: 'City name must be at least 2 characters', trigger: 'blur' },
    { validator: validateCityName, trigger: 'blur' }
  ]
};

const addNewCity = async () => {
  if (!formRef.value || isLoading.value) return;
  
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  const cityName = formData.cityName.trim();
  
  if (props.existingCities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
    ElMessage.warning('City already exists');
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
      formData.cityName = '';
      formRef.value.resetFields();
    } else {
      ElMessage.error('City not found');
    }
  } catch (error) {
    ElMessage.error('City not found or API error');
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
