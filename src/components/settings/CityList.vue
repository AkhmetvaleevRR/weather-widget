<template>
  <draggable 
    :list="localCities" 
    item-key="order"
    @end="onDragEnd"
    class="cities-list"
  >
    <template #item="{ element: city, index }">
      <div class="city-item" :key="city.order">
        <el-icon class="drag-handle"><Menu /></el-icon>
        <span class="city-name">{{ city.name }}</span>
        <el-button 
          type="info"
          :icon="Delete" 
          size="small" 
          link
          @click="removeCity(index)"
          :disabled="localCities.length === 1"
        />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, defineProps, defineEmits} from 'vue';
import { ElMessage, ElIcon, ElButton } from 'element-plus';
import { Menu, Delete } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import type { CityConfig } from '@/types/weather';

const props = defineProps<{ modelValue: CityConfig[] }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: CityConfig[]): void }>();

const localCities = ref<CityConfig[]>([]);

watch(() => props.modelValue, (newVal) => {
  localCities.value = JSON.parse(JSON.stringify(newVal || []));
}, { immediate: true, deep: true });

const emitUpdate = () => {
  nextTick(() => {
    emit('update:modelValue', JSON.parse(JSON.stringify(localCities.value)));
  });
};

const onDragEnd = () => {
  localCities.value.forEach((city, index) => city.order = index);
  emitUpdate();
};

const removeCity = (index: number) => {
  if (localCities.value.length > 1) {
    localCities.value.splice(index, 1);
    localCities.value.forEach((city, i) => city.order = i);
    emitUpdate();
    ElMessage.success('City removed');
  } else {
    ElMessage.warning('Cannot remove the last city');
  }
};
</script>

<style scoped lang="scss">
.cities-list {
  min-height: 100px;
  margin-bottom: 20px;
  max-height: 210px;
  overflow-y: auto;
}

.city-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: #f5f7fa;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background: #ebf5ff;
  }

  .drag-handle {
    margin-right: 12px;
    cursor: grab;
    color: #909399;

    &:active {
      cursor: grabbing;
    }
  }

  .city-name {
    flex: 1;
    font-weight: 500;
  }
}
</style>
