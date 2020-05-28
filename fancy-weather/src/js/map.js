export default function createMap(/* coordinates */) { // [55.76, 37.64]
  /* eslint-disable */
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search',
  });
  /* eslint-enable */

  /* eslint-disable */
  const location = ymaps.geolocation;
  /* eslint-enable */

  location.get({
    mapStateAutoApply: true,
  })
    .then(
      (result) => {
        // Получение местоположения пользователя.
        // const userAddress = result.geoObjects.get(0).properties.get('text');
        const userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();

        // Добавление метки
        /* eslint-disable */
        const myPlacemark = new ymaps.Placemark(userCoodinates, {
          // balloonContentBody: userAddress
        });
        /* eslint-enable */
        myMap.geoObjects.add(myPlacemark);

        // Перемещение центра карты в точку с новыми координатами
        myMap.setCenter(userCoodinates, 10);
      },
      (err) => {
        console.log(`Ошибка: ${err}`);
      },
    );

  // const searchButton = document.querySelector('.searchButton');
  // if (searchButton) {
  //   searchButton.onclick = function () {

  //     myMap.geoObjects.removeAll();
  //     var myPlacemark = new ymaps.Placemark(coordinates, {
  //       // balloonContentBody: userAddress
  //     });
  //     myMap.geoObjects.add(myPlacemark);

  //     // Плавное перемещение центра карты в точку с новыми координатами
  //     myMap.panTo(coordinates, {
  //       delay: 1500
  //     });
  //   }
  // }
}
