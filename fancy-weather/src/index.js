import {
  createMap,
  getCurrentCoordinates,
} from './js/map';
import {
  getCurrentWeather,
  showCurrentWeather,
  getForecast,
  showForecast,
} from './js/weather';
import { geocodeByCityName, geocodeByCoordinates } from './js/geocode';

document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line no-undef
  ymaps.ready(() => {
    createMap();
  });

  try {
    const currentCoordinates = await getCurrentCoordinates();
    let geocode = await geocodeByCoordinates(currentCoordinates);
    // const { lat, lng } = geocode.results[0].geometry;

    let currentWeather = await getCurrentWeather(currentCoordinates);
    let forecast = await getForecast(currentCoordinates);

    let timezone = geocode.results[0].annotations.timezone.name;
    let dateBlock = document.querySelector('.weather-today__period');
    let timerId = setInterval(() => {
      const date = new Date().toLocaleString('en', {
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

    let dmsCoordinates = geocode.results[0].annotations.DMS;
    let latitude = document.querySelector('.map__latitude span');
    latitude.textContent = dmsCoordinates.lat;
    let longitude = document.querySelector('.map__longitude span');
    longitude.textContent = dmsCoordinates.lng;

    let humanSettlement = geocode.results[0].formatted;
    let city = document.querySelector('.weather__city');
    city.textContent = humanSettlement;

    showCurrentWeather(currentWeather);
    showForecast(forecast);

    document.querySelector('.main').setAttribute('style', 'display: flex;');

    const formSearch = document.querySelector('.search__form');
    formSearch.addEventListener('submit', async (e) => {
      e.preventDefault();

      const searchValue = document.querySelector('.search__input').value;
      geocode = await geocodeByCityName(searchValue);

      const { lat, lng } = geocode.results[0].geometry;
      // console.log('coord', [lat, lng]);

      currentWeather = await getCurrentWeather([lat, lng]);
      forecast = await getForecast([lat, lng]);

      timezone = geocode.results[0].annotations.timezone.name;
      clearInterval(timerId);
      timerId = setInterval(() => {
        const date = new Date().toLocaleString('en', {
          month: 'long',
          day: 'numeric',
          weekday: 'short',
          timeZone: timezone,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
        dateBlock = document.querySelector('.weather-today__period');
        dateBlock.innerHTML = date;
      }, 1000);

      dmsCoordinates = geocode.results[0].annotations.DMS;
      latitude = document.querySelector('.map__latitude span');
      latitude.textContent = dmsCoordinates.lat;
      longitude = document.querySelector('.map__longitude span');
      longitude.textContent = dmsCoordinates.lng;

      humanSettlement = geocode.results[0].formatted;
      city = document.querySelector('.weather__city');
      city.textContent = humanSettlement;

      showCurrentWeather(currentWeather);
      showForecast(forecast);
    });
  } catch (error) {
    console.log(error);
  }
});
