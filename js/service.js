'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mapElement = mainElement.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var filtersContainerElement = mapElement.querySelector('.map__filters-container');
  var adFormElement = mainElement.querySelector('.ad-form');

  var PIN_WIDTH = mainPinElement.offsetWidth; // Берём ширину метки и записываем в переменную
  var PIN_HEIGHT = PIN_WIDTH + 10; // Высота метки + высота иголки

  window.service = {
    MAX_NUMBER_ADS: 5,

    elements: {
      mainElement: mainElement,
      mapElement: mapElement,
      mainPinElement: mainPinElement,
      pinsContainerElement: mapElement.querySelector('.map__pins'),
      filtersContainerElement: filtersContainerElement,
      filtersFormElement: filtersContainerElement.querySelector('.map__filters'),
      adsFilterElements: mapElement.querySelectorAll('.map__filters > *'),
      adFormElement: adFormElement,
      adFieldsetElements: adFormElement.querySelectorAll('fieldset'),
      addressFieldElement: adFormElement.querySelector('#address'),
      roomNumberElement: adFormElement.querySelector('#room_number'),
      capacityElement: adFormElement.querySelector('#capacity'),
      priceElement: adFormElement.querySelector('#price'),
      typeHousingElement: adFormElement.querySelector('#type'),
      checkinElement: adFormElement.querySelector('#timein'),
      checkoutElement: adFormElement.querySelector('#timeout'),
    },

    Pin: {
      WIDTH: PIN_WIDTH,
      HEIGHT: PIN_HEIGHT,
      SORCE_X: mainPinElement.offsetLeft,
      SORCE_Y: mainPinElement.offsetTop,
    },

    KeyCodes: {
      ENTER: 'Enter',
      ESC: 'Escape',
    },
  };
})();
