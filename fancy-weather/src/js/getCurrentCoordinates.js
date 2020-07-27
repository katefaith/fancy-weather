import { showErrorPopup } from './errors';

export default function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve([pos.coords.latitude,
      pos.coords.longitude]), (err) => {
      if (err.message === 'User denied Geolocation') {
        showErrorPopup('Allow access to your geolocation to see the weather forecast');
      } else {
        showErrorPopup(err.message);
      }
      reject(err);
    });
  });
}
