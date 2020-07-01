'use strict';

(function () {
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  window.form = {
    validateСapacities: function () {
      if (window.service.elements.capacityElement.value > window.service.elements.roomNumberElement.value && window.service.elements.capacityElement.value !== '0' && window.service.elements.roomNumberElement.value !== '100') {
        window.service.elements.capacityElement.valid = false; // Указываем что вместимость не валидна
        window.service.elements.capacityElement.setCustomValidity('В такое маленькое жильё не поместится столько гостей');

      } else if (window.service.elements.capacityElement.value === '0' & window.service.elements.roomNumberElement.value !== '100') {
        window.service.elements.capacityElement.valid = false; // Указываем что вместимость не валидна
        window.service.elements.capacityElement.setCustomValidity('Если тебе нужно особняк для вечеринки - выбери 100 комнат!');

      } else if (window.service.elements.capacityElement.value !== '0' & window.service.elements.roomNumberElement.value === '100') {
        window.service.elements.capacityElement.valid = false; // Указываем что вместимость не валидна
        window.service.elements.capacityElement.setCustomValidity('Зачем тебе такой большой особняк для ' + window.service.elements.capacityElement.value + 'человек!? Обычно его берут для вечеринок');

      } else {
        window.service.elements.capacityElement.valid = true; // Указываем что вместимость валидна
        window.service.elements.capacityElement.setCustomValidity('');
      }
    },

    validatePrice: function () {
      if (window.service.elements.typeHousingElement.value === 'bungalo') {
        window.service.elements.priceElement.placeholder = MinPrice.BUNGALO;
        window.service.elements.priceElement.min = MinPrice.BUNGALO;

      } else if (window.service.elements.typeHousingElement.value === 'flat') {
        window.service.elements.priceElement.placeholder = MinPrice.FLAT;
        window.service.elements.priceElement.min = MinPrice.FLAT;

      } else if (window.service.elements.typeHousingElement.value === 'house') {
        window.service.elements.priceElement.placeholder = MinPrice.HOUSE;
        window.service.elements.priceElement.min = MinPrice.HOUSE;

      } else {
        window.service.elements.priceElement.placeholder = MinPrice.PALACE;
        window.service.elements.priceElement.min = MinPrice.PALACE;
      }
    },

    validateChecks: function (evt) {
      if (evt.target === window.service.elements.checkinElement) {
        window.service.elements.checkoutElement.value = window.service.elements.checkinElement.value;

      } else {
        window.service.elements.checkinElement.value = window.service.elements.checkoutElement.value;
      }
    },

    toggleInputs: function (elementsArray) {
      elementsArray.forEach(function (item) {
        item.disabled = !item.disabled; // Разблокируем елемент
      });
    },
  };
})();
