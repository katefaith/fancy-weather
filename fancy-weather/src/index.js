import {
  getCurrentWeather,
  showCurrentWeather,
  getForecast,
  showForecast,
} from './js/weather';

import {
  geocodeByCityName,
  geocodeByCoordinates,
} from './js/geocode';

import { mapboxAccessToken } from './js/apiKeys';

import {
  closeErrorPopup,
  showErrorPopup,
} from './js/errors';

function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve([pos.coords.latitude,
      pos.coords.longitude]), (err) => reject(err));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const popupCloseButton = document.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closeErrorPopup);

  const currentCoordinates = await getCurrentCoordinates();
  let geocode = await geocodeByCoordinates(currentCoordinates);

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
  const latitude = document.querySelector('.map__latitude span');
  latitude.textContent = dmsCoordinates.lat;
  const longitude = document.querySelector('.map__longitude span');
  longitude.textContent = dmsCoordinates.lng;

  const city = document.querySelector('.weather__city');

  let { components } = geocode.results[0];
  console.log('address info', components);
  let name = components.city
    || components.town
    || components.village
    || components.county
    // || components.state_district
    || components.hamlet;
  city.textContent = `${name}, ${components.country || components.continent}`;

  showCurrentWeather(currentWeather);
  showForecast(forecast);

  // eslint-disable-next-line no-undef
  mapboxgl.accessToken = mapboxAccessToken;
  // eslint-disable-next-line no-undef
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [currentCoordinates[1], currentCoordinates[0]],
    zoom: 10,
  });
  // eslint-disable-next-line no-undef
  let marker = new mapboxgl.Marker()
    .setLngLat([currentCoordinates[1], currentCoordinates[0]])
    .addTo(map);

  const formSearch = document.querySelector('.search__form');
  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchValue = document.querySelector('.search__input').value;
    formSearch.reset();
    geocode = await geocodeByCityName(searchValue);

    if (geocode.results.length > 0 && searchValue.length > 2) { // есть ли результаты && валидация
      const { lat, lng } = geocode.results[0].geometry;

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
      latitude.textContent = dmsCoordinates.lat;
      longitude.textContent = dmsCoordinates.lng;

      components = geocode.results[0].components;
      name = components.city
        || components.town
        || components.village
        || components.county
        // || components.state_district
        || components.hamlet;
      city.textContent = `${name}, ${components.country || components.continent}`;
      console.log('address info', geocode.results[0].components);

      showCurrentWeather(currentWeather);
      showForecast(forecast);

      marker.remove();
      // eslint-disable-next-line no-undef
      marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
      map.flyTo({
        center: [lng, lat],
        essential: true,
      });
    } else {
      showErrorPopup('Request is not valid!');
    }
  });
});
