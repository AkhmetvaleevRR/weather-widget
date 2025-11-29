<template>
  <div class="city-settings">
    <CityList v-model="localCities" @update:modelValue="emitUpdate" />
    <AddCityForm :existing-cities="localCities" @add-city="onAddCity" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, defineProps, defineEmits } from 'vue';
import type { CityConfig } from '@/types/weather';
import CityList from '../components/CityList.vue';
import AddCityForm from '../components/AddCityForm.vue';

const props = defineProps<{ modelValue: CityConfig[] }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: CityConfig[]): void }>();

const localCities = ref<CityConfig[]>([]);

watch(() => props.modelValue, (newVal) => {
  localCities.value = JSON.parse(JSON.stringify(newVal || []));
}, { immediate: true, deep: true });

const onAddCity = (newCity: CityConfig) => {
  emit('update:modelValue', [...localCities.value, newCity]);
};

const emitUpdate = () => {
  nextTick(() => {
    emit('update:modelValue', JSON.parse(JSON.stringify(localCities.value)));
  });
};
</script>

<style scoped lang="scss">
.city-settings {
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>