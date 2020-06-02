import getCurrentCoordinates from './js/getCurrentCoordinates';
import {
  getCurrentWeather,
  getForecast,
} from './js/getWeather';
import showData from './js/showData';
import {
  geocodeByCityName,
  geocodeByCoordinates,
} from './js/geocode';
import { mapboxAccessToken } from './js/apiKeys';
import {
  closeErrorPopup,
  showErrorPopup,
} from './js/errors';
import {
  сelsiusToFahrenheit,
  fahrenheitToCelsius,
  recalcTemperature,
} from './js/recalcTemperature';
import changeBackground from './js/changeBackground';

document.addEventListener('DOMContentLoaded', async () => {
  const popupCloseButton = document.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closeErrorPopup);

  const fahrenheitRadio = document.querySelector('#fahrenheit');
  const сelsiusRadio = document.querySelector('#сelsius');
  const units = localStorage.getItem('units');
  if (units === 'F') {
    fahrenheitRadio.setAttribute('checked', '');
    сelsiusRadio.removeAttribute('checked');
  }

  fahrenheitRadio.addEventListener('change', () => {
    recalcTemperature(сelsiusToFahrenheit);
    localStorage.setItem('units', 'F');
  });

  сelsiusRadio.addEventListener('change', () => {
    recalcTemperature(fahrenheitToCelsius);
    localStorage.setItem('units', 'C');
  });

  const currentCoordinates = await getCurrentCoordinates();
  let geocode = await geocodeByCoordinates(currentCoordinates);

  let currentWeather = await getCurrentWeather(currentCoordinates);
  let forecast = await getForecast(currentCoordinates);

  await changeBackground(geocode);
  let timerId = showData(geocode, currentWeather, forecast);

  // create map
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

  document.querySelector('.main').classList.remove('main--opacity');

  // change bg on click
  const changeBgButton = document.querySelector('.controls__bg-update');
  changeBgButton.addEventListener('click', () => changeBackground(geocode));

  // search
  const formSearch = document.querySelector('.search__form');
  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchValue = document.querySelector('.search__input').value;
    formSearch.reset();
    geocode = await geocodeByCityName(searchValue);

    // if there are some results && validation
    if (geocode.results.length > 0 && searchValue.length > 2) {
      const { lat, lng } = geocode.results[0].geometry;

      currentWeather = await getCurrentWeather([lat, lng]);
      forecast = await getForecast([lat, lng]);

      await changeBackground(geocode);

      clearInterval(timerId);
      timerId = showData(geocode, currentWeather, forecast);

      // change map
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
