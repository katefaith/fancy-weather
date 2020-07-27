import { сelsiusToFahrenheit } from './recalcTemperature';

function showCoordinates(geocode) {
  const dmsCoordinates = geocode.results[0].annotations.DMS;

  const latitude = document.querySelector('.map__latitude span');
  latitude.textContent = dmsCoordinates.lat;
  const longitude = document.querySelector('.map__longitude span');
  longitude.textContent = dmsCoordinates.lng;
}

function showCityName(geocode) {
  const city = document.querySelector('.weather__city');
  const { components } = geocode.results[0];
  console.log('address info', components);
  const cityName = components.city
    || components.town
    || components.village
    || components.county
    || components.hamlet
    || components.state;
  city.textContent = `${cityName}, ${components.country || components.continent}`;
}

function showCurrentWeather(weatherObj, units) {
  const icon = document.querySelector('.weather-today__icon');
  icon.setAttribute('src', `img/weather-icons/${weatherObj.weather.icon}.svg`);
  icon.setAttribute('alt', weatherObj.weather.icon);

  const temperature = document.querySelector('.weather-today__temperature');
  const temp = (units === 'F') ? сelsiusToFahrenheit(Math.round(weatherObj.temp)) : Math.round(weatherObj.temp);
  temperature.innerHTML = (temp > 0) ? `<span>+${temp}</span>°` : `<span>${temp}</span>°`;

  const summary = document.querySelector('.weather-today__summary');
  summary.textContent = weatherObj.weather.description;

  const feelsLike = document.querySelector('.weather-today__feels-like span');
  const appTemp = (units === 'F') ? сelsiusToFahrenheit(Math.round(weatherObj.app_temp)) : Math.round(weatherObj.app_temp);
  feelsLike.innerHTML = (appTemp > 0)
    ? `+${appTemp}`
    : appTemp;

  const wind = document.querySelector('.weather-today__wind span');
  wind.textContent = weatherObj.wind_spd.toFixed(1);

  const humidity = document.querySelector('.weather-today__humidity span');
  humidity.textContent = weatherObj.rh;
}

function showForecast(forecastObj, units) {
  const weekdays = document.querySelectorAll('.weather-forecast__weekday');
  const icons = document.querySelectorAll('.weather-forecast__icon');
  const summaries = document.querySelectorAll('.weather-forecast__summary');
  const temperatures = document.querySelectorAll('.weather-forecast__temperature');

  forecastObj.data.forEach((day, index) => {
    if (index > 0) {
      const weekday = new Date(day.ts * 1000).toLocaleString('en', {
        weekday: 'long',
        timezone: `${forecastObj.timezone}`,
      });
      weekdays[index - 1].textContent = weekday;

      icons[index - 1].setAttribute('src', `img/weather-icons/${day.weather.icon}.svg`);
      icons[index - 1].setAttribute('alt', day.weather.icon);

      summaries[index - 1].textContent = day.weather.description;
      const temp = (units === 'F') ? сelsiusToFahrenheit(Math.round(day.temp)) : Math.round(day.temp);
      temperatures[index - 1].innerHTML = (temp > 0) ? `<span>+${temp}</span>°` : `<span>${temp}</span>°`;
    }
  });
}

function showDateAndTime(geocode) {
  const timezone = geocode.results[0].annotations.timezone.name;
  const dateBlock = document.querySelector('.weather-today__period');
  let date = new Date().toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  dateBlock.innerHTML = date;

  const timerId = setInterval(() => {
    date = new Date().toLocaleString('en', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    dateBlock.innerHTML = date;
  }, 1000);

  return timerId;
}

export default function showData(geocode, currentWeather, forecast) {
  showCoordinates(geocode);
  showCityName(geocode);
  const timerId = showDateAndTime(geocode);

  console.log('current weather', currentWeather);
  console.log('forecast', forecast);

  const units = localStorage.getItem('units');
  showCurrentWeather(currentWeather, units);
  showForecast(forecast, units);

  return timerId;
}
