import fetchData from './fetchData';
import { weatherbitApiKey } from './apiKeys';


export async function getCurrentWeather(coordinates) {
  const [latitude, longitude] = coordinates;
  const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&lang=en&key=${weatherbitApiKey}`;

  const weather = await fetchData(currentWeatherUrl);
  return weather.data[0];
}

export async function getForecast(coordinates) {
  const [latitude, longitude] = coordinates;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=4&lang=en&key=${weatherbitApiKey}`;

  const forecast = await fetchData(url);
  return forecast;
}
