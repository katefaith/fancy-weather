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
