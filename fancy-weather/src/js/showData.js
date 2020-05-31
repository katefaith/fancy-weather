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
    // || components.state_district
    || components.hamlet
    || components.state;
  city.textContent = `${cityName}, ${components.country || components.continent}`;
}

function showCurrentWeather(weatherObj) {
  const icon = document.querySelector('.weather-today__icon');
  icon.setAttribute('src', `img/weather-icons/${weatherObj.weather.icon}.svg`);
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

function showForecast(forecastObj) {
  const weekdays = document.querySelectorAll('.weather-forecast__weekday');
  const icons = document.querySelectorAll('.weather-forecast__icon');
  const summaries = document.querySelectorAll('.weather-forecast__summary');
  const temperatures = document.querySelectorAll('.weather-forecast__temperature span');

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
      temperatures[index - 1].textContent = (Math.round(day.temp) > 0) ? `+${Math.round(day.temp)}` : Math.round(day.temp);
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
  showCurrentWeather(currentWeather);
  showForecast(forecast);

  return timerId;
}
