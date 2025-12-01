// src/widget.ts
import { defineCustomElement } from 'vue';
import WeatherWidget from './components/WeatherWidget.ce.vue';



// Создаем кастомный HTML-элемент на основе Vue-компонента
const WeatherWidgetElement = defineCustomElement(WeatherWidget);

// Регистрируем его в браузере под тегом <weather-widget>
customElements.define('weather-widget', WeatherWidgetElement);
