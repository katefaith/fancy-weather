function getCurrentCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve([pos.coords.latitude,
      pos.coords.longitude]), (err) => reject(err));
  });
}

export default async function createMap() {
  const currentCoordinates = await getCurrentCoordinates();

  // eslint-disable-next-line no-undef
  const myMap = new ymaps.Map('map', {
    center: currentCoordinates,
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search',
  });

  // eslint-disable-next-line no-undef
  const myPlacemark = new ymaps.Placemark(currentCoordinates, {
    // balloonContentBody: userAddress
  });
  myMap.geoObjects.add(myPlacemark);

  // const searchButton = document.querySelector('.searchButton');
  // if (searchButton) {
  //   searchButton.onclick = () => {
  //     const coordinates = [55.76, 37.64]; // Москва

  //     myMap.geoObjects.removeAll();
  //     // eslint-disable-next-line no-undef
  //     myPlacemark = new ymaps.Placemark(coordinates, {
  //       // balloonContentBody: userAddress
  //     });
  //     myMap.geoObjects.add(myPlacemark);

  //     myMap.panTo(coordinates, {
  //       delay: 1500,
  //     });
  //   };
  // }
}
