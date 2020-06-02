import { unsplashAccessKey } from './apiKeys';

async function getLinkToImage(...args) {
  console.log('query parameters for background image', args);
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${args.join(',')}&client_id=${unsplashAccessKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
  } catch (error) {
    return error.message;
  }
}

function defineTimeOfDay(hours) {
  if (hours >= 6 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 18) return 'day';
  if (hours >= 18 && hours < 24) return 'evening';
  return 'night';
}

function defineSeason(month, latitude) {
  // for the Northern hemisphere
  if (latitude > 0) {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  // for the Southern hemisphere
  if (month >= 3 && month <= 5) return 'autumn';
  if (month >= 6 && month <= 8) return 'winter';
  if (month >= 9 && month <= 11) return 'spring';
  return 'summer';
}

export default async function changeBackground(geocode) {
  const timezone = geocode.results[0].annotations.timezone.name;
  const latitude = geocode.results[0].geometry.lat;
  const hours = new Date().toLocaleString('ru', { hour: 'numeric', timeZone: timezone });
  const month = new Date().toLocaleString('ru', { month: 'numeric', timeZone: timezone });

  const timeOfDay = defineTimeOfDay(hours);
  const season = defineSeason(month, latitude);

  const link = await getLinkToImage(season, timeOfDay, 'nature');
  const defaultLink = 'https://images.unsplash.com/photo-1491036775913-3fbc5c455842?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzOTA1NX0';

  const background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)) fixed,
  url("${link}") center / cover fixed;`;
  const defaultBackground = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)) fixed,
  url("${defaultLink}") center / cover fixed;`;

  return new Promise((resolve) => {
    const img = new Image();
    img.src = link;
    img.addEventListener('load', () => {
      resolve(document.body.setAttribute('style', `background: ${background}`));
    });
    img.addEventListener('error', () => {
      resolve(document.body.setAttribute('style', `background: ${defaultBackground}`));
    });
  });
}
