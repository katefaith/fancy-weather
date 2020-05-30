import { opencagedataApiKey } from './apiKeys';
import { fetchData } from './weather';

export async function geocodeByCityName(cityName) {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${opencagedataApiKey}&language=en&q=${cityName}`;

  const geocode = await fetchData(url);
  return geocode;
}

export async function geocodeByCoordinates(coordinates) {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${opencagedataApiKey}&language=en&q=${coordinates[0]},${coordinates[1]}`;

  const geocode = await fetchData(url);
  return geocode;
}
