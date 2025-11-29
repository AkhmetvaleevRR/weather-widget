import type { WeatherData } from '@/types/weather';

const API_KEY = '722ea0c4218c90b3c6506d66c82de5eb'; 
const BASE_URL = 'https://api.openweathermap.org';

export class WeatherApi {
  private static instance: WeatherApi;

  public static getInstance(): WeatherApi {
    if (!WeatherApi.instance) {
      WeatherApi.instance = new WeatherApi();
    }
    return WeatherApi.instance;
  }
  
  async getCoordsByCityName(city: string): Promise<{ lat: number; lon: number } | null> {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  }

  async getWeatherByCityName(city: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to load weather data');
    }
    return response.json() as Promise<WeatherData>;
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to load weather data');
    }
    return response.json() as Promise<WeatherData>;
  }

  async validateCity(city: string): Promise<{ name: string; lat: number; lon: number } | null> {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates for validation');
    }
    const data = await response.json();
    if (data && data.length > 0) {
      return { name: data[0].name, lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}