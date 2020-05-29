import { createMap, getCurrentCoordinates } from './js/map';
import { getCurrentWeather, showCurrentWeather } from './js/currentWeather';

document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line no-undef
  ymaps.ready(() => {
    createMap();
  });

  try {
    const currentCoordinates = await getCurrentCoordinates();
    const currentWeather = await getCurrentWeather(currentCoordinates);
    showCurrentWeather(currentWeather);
  } catch (error) {
    console.log(error);
  }
});
