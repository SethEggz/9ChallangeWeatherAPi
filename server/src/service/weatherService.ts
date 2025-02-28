import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object
class Coordinates {
  lat: number;
  lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
}
// TODO: Define a class for the Weather object
class Weather{
  cityName: string;
  date: string;
  temp: number;
  wind: number;
  humidity:number;
  
  constructor(cityName: string, date: string, temp: number, wind: number, humidity:number,){
    this.cityName = cityName;
    this.date = date;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }


}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  
    private baseURL: string;
    private apiKey: string;
    private cityName: string;
  
    constructor() {
      this.baseURL = process.env.BASE_URL || '';
      this.apiKey = process.env.API_KEY || '';
      this.cityName = '';
    }
  // TODO: Create fetchLocationData method
 
  private async fetchLocationData(query: string) {
    try {
      const response = await axios.get(`${this.baseURL}/geocode`, {
        params: {
          q: query,
          apiKey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }
  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
      const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
      return this.destructureLocationData(locationData);
    } catch (error) {
      console.error('Error fetching and destructuring location data:', error);
      throw error;
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await axios.get(`${this.baseURL}/onecall?${this.buildWeatherQuery(coordinates)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    return new Weather(
      this.cityName,
      new Date(response.current.dt * 1000).toLocaleDateString(),
      response.current.temp,
      response.current.wind_speed,
      response.current.humidity
    );
   }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [currentWeather];
    for (let i = 1; i < 6; i++) {
      const weather = weatherData[i];
      forecastArray.push(
        new Weather(
          this.cityName,
          new Date(weather.dt * 1000).toLocaleDateString(),
          weather.temp.day,
          weather.wind_speed,
          weather.humidity
        )
      );
    }
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return forecastArray;
   }
}

export default new WeatherService();
