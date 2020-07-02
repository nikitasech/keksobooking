'use strict';

(function () {
  var capacityElement = window.service.elements.capacityElement;
  var roomNumberElement = window.service.elements.roomNumberElement;

  var typeHousingElement = window.service.elements.typeHousingElement;
  var priceElement = window.service.elements.priceElement;

  var checkoutElement = window.service.elements.checkoutElement;
  var checkinElement = window.service.elements.checkinElement;

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  window.form = {
    validateСapacities: function () {
      if (capacityElement.value > roomNumberElement.value && capacityElement.value !== '0' && roomNumberElement.value !== '100') {
        capacityElement.valid = false; // Указываем что вместимость не валидна
        capacityElement.setCustomValidity('В такое маленькое жильё не поместится столько гостей');

      } else if (capacityElement.value === '0' & roomNumberElement.value !== '100') {
        capacityElement.valid = false; // Указываем что вместимость не валидна
        capacityElement.setCustomValidity('Если тебе нужно особняк для вечеринки - выбери 100 комнат!');

      } else if (capacityElement.value !== '0' & window.service.elements.roomNumberElement.value === '100') {
        capacityElement.valid = false; // Указываем что вместимость не валидна
        capacityElement.setCustomValidity('Зачем тебе такой большой особняк для ' + capacityElement.value + 'человек!? Обычно его берут для вечеринок');

      } else {
        capacityElement.valid = true; // Указываем что вместимость валидна
        capacityElement.setCustomValidity('');
      }
    },

    validatePrice: function () {
      if (typeHousingElement.value === 'bungalo') {
        priceElement.placeholder = MinPrice.BUNGALO;
        priceElement.min = MinPrice.BUNGALO;

      } else if (typeHousingElement.value === 'flat') {
        priceElement.placeholder = MinPrice.FLAT;
        priceElement.min = MinPrice.FLAT;

      } else if (typeHousingElement.value === 'house') {
        priceElement.placeholder = MinPrice.HOUSE;
        priceElement.min = MinPrice.HOUSE;

      } else {
        priceElement.placeholder = MinPrice.PALACE;
        priceElement.min = MinPrice.PALACE;
      }
    },

    validateChecks: function (evt) {
      if (evt.target === checkinElement) {
        checkoutElement.value = checkinElement.value;

      } else {
        checkinElement.value = checkoutElement.value;
      }
    },

    toggleInputs: function (elementsArray) {
      elementsArray.forEach(function (item) {
        item.disabled = !item.disabled; // Разблокируем елемент
      });
    },
  };
})();
