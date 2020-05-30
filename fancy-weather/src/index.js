import { createMap, getCurrentCoordinates } from './js/map';
import {
  getCurrentWeather,
  showCurrentWeather,
  getForecast,
  showForecast,
} from './js/weather';

document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line no-undef
  ymaps.ready(() => {
    createMap();
  });

  try {
    const currentCoordinates = await getCurrentCoordinates();
    // console.log(currentCoordinates);
    const currentWeather = await getCurrentWeather(currentCoordinates);
    const forecast = await getForecast(currentCoordinates);

    showCurrentWeather(currentWeather);
    showForecast(forecast);
  } catch (error) {
    console.log(error);
  }

  // const formSearch = document.querySelector('.search__form');
  // formSearch.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   console.log('submit');
  // });
});
