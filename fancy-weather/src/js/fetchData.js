import { showErrorPopup } from './errors';

export default function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => showErrorPopup(`Something went wrong: ${error.message}`));
}
