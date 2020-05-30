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

function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve([pos.coords.latitude,
      pos.coords.longitude]), (err) => reject(err));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
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

      marker.remove();
      // eslint-disable-next-line no-undef
      marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
      map.flyTo({
        center: [lng, lat],
        essential: true,
      });
    });
  } catch (error) {
    console.log(error);
  }
});
