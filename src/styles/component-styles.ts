// Стили всех компонентов виджета
export const componentStyles = `
/* WeatherWidget.ce.vue styles */
.weather-widget {
  width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.weather-widget .widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  color: black;
}

.weather-widget .widget-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.weather-widget .widget-header__button {
  margin-left: auto;
  font-size: 18px;
}

.weather-widget .loading, .weather-widget .error {
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.weather-widget .loading .el-icon, .weather-widget .error .el-icon {
  font-size: 24px;
}

/* SettingsVue.vue styles */
.city-settings {
  padding: 20px;
}

/* WeatherVue.vue styles */
.weather-content {
  padding: 20px;
}

.weather-content .city-selector {
  margin-bottom: 20px;
}

/* CityList.vue styles */
.cities-list {
  min-height: 100px;
  margin-bottom: 20px;
  max-height: 200px;
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
}

.city-item:hover {
  background: #ebf5ff;
}

.city-item .drag-handle {
  margin-right: 12px;
  cursor: grab;
  color: #909399;
}

.city-item .drag-handle:active {
  cursor: grabbing;
}

.city-item .city-name {
  flex: 1;
  font-weight: 500;
}

/* AddCityForm.vue styles */
.settings-header {
  margin-top: auto;
}

/* WeatherDisplay.vue styles */
.weather-display .weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.weather-display .weather-main .temperature {
  font-size: 48px;
  font-weight: 300;
  color: black;
}

.weather-display .weather-main .weather-icon img {
  width: 80px;
  height: 80px;
}

.weather-display .weather-details .city-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #303133;
}

.weather-display .weather-details .weather-description {
  text-transform: capitalize;
  color: #606266;
  margin-bottom: 16px;
}

.weather-display .weather-details .weather-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.weather-display .weather-details .weather-stats .stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.weather-display .weather-details .weather-stats .stat-item .label {
  color: #909399;
  font-size: 14px;
}

.weather-display .weather-details .weather-stats .stat-item .value {
  color: #303133;
  font-weight: 500;
}
`;