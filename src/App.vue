<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script setup lang="ts">
import WeatherWidget from './components/WeatherWidget.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
  padding: 20px;
}
</style>