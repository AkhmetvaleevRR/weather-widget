// src/widget.ts
import { defineCustomElement } from 'vue';
import WeatherWidget from './components/WeatherWidget.ce.vue';

// Импортируем все стили Element Plus
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/index.css';

// Импортируем стили конкретных компонентов
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-select.css';
import 'element-plus/theme-chalk/el-option.css';
import 'element-plus/theme-chalk/el-input.css';
import 'element-plus/theme-chalk/el-form.css';
import 'element-plus/theme-chalk/el-form-item.css';
import 'element-plus/theme-chalk/el-icon.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-loading.css';

// Создаем кастомный HTML-элемент на основе Vue-компонента
const WeatherWidgetElement = defineCustomElement(WeatherWidget);

// Регистрируем его в браузере под тегом <weather-widget>
customElements.define('weather-widget', WeatherWidgetElement);
