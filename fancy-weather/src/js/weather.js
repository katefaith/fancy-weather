import weatherbitApiKey from './apiKeys';

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function getCurrentWeather(coordinates) {
  const [latitude, longitude] = coordinates;
  const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&lang=en&key=${weatherbitApiKey}`;

  const weather = await fetchData(currentWeatherUrl);
  return weather.data[0];
}

export function showCurrentWeather(weatherObj) {
  // поменять иконки
  const icon = document.querySelector('.weather-today__icon');
  icon.setAttribute('alt', weatherObj.weather.icon);

  const temperature = document.querySelector('.weather-today__temperature span');
  temperature.textContent = (Math.round(weatherObj.temp) > 0) ? `+${Math.round(weatherObj.temp)}` : Math.round(weatherObj.temp);

  const summary = document.querySelector('.weather-today__summary');
  summary.textContent = weatherObj.weather.description;

  const feelsLike = document.querySelector('.weather-today__feels-like span');
  feelsLike.textContent = (Math.round(weatherObj.app_temp) > 0) ? `+${Math.round(weatherObj.app_temp)}` : Math.round(weatherObj.app_temp);

  const wind = document.querySelector('.weather-today__wind span');
  wind.textContent = weatherObj.wind_spd.toFixed(1);

  const humidity = document.querySelector('.weather-today__humidity span');
  humidity.textContent = weatherObj.rh;
}

export async function getForecast(coordinates) {
  const [latitude, longitude] = coordinates;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=3&lang=en&key=${weatherbitApiKey}`;

  const forecast = await fetchData(url);
  return forecast;
}

export function showForecast(forecastObj) {
  // const weekdays = document.querySelectorAll('.weather-forecast__weekday');
  const dates = document.querySelectorAll('.weather-forecast__date');
  const icons = document.querySelectorAll('.weather-forecast__icon');
  const summaries = document.querySelectorAll('.weather-forecast__summary');
  const temperatures = document.querySelectorAll('.weather-forecast__temperature span');

  forecastObj.data.forEach((day, index) => {
    // поменять иконки
    dates[index].textContent = day.datetime;
    icons[index].setAttribute('alt', day.weather.icon);
    summaries[index].textContent = day.weather.description;
    temperatures[index].textContent = (Math.round(day.temp) > 0) ? `+${Math.round(day.temp)}` : Math.round(day.temp);
  });
}
