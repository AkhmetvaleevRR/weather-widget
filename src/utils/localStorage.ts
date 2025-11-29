import { WidgetConfig } from '@/types/weather';

const STORAGE_KEY = 'weather-widget-config';

export class LocalStorageManager {
  static getConfig(): WidgetConfig | null {
    try {
      const config = localStorage.getItem(STORAGE_KEY);
      return config ? JSON.parse(config) : null;
    } catch {
      return null;
    }
  }

  static saveConfig(config: WidgetConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }

  static getDefaultConfig(): WidgetConfig {
    return {
      cities: [{ name: 'London', order: 0 }],
      currentCity: 'London'
    };
  }
}