'use strict';

(function () {
  var SAVE_URL = 'https://javasfcript.pages.academy/keksobooking';
  var mainElement = window.service.elements.mainElement;
  var adFormElement = window.service.elements.adFormElement;
  var adFieldsetElements = window.service.elements.adFieldsetElements;
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

  var KeyCodes = window.service.KeyCodes;

  function validatePrice() {
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
  }

  function validateChecks(evt) {
    if (evt.target === checkinElement) {
      checkoutElement.value = checkinElement.value;

    } else {
      checkinElement.value = checkoutElement.value;
    }
  }

  function validateСapacities() {
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
  }

  function hangHandlersValidates() {
    roomNumberElement.addEventListener('change', function () {
      validateСapacities(); // Вызываем функцию валидации вместимости
    });

    capacityElement.addEventListener('change', function () {
      validateСapacities(); // Вызываем функцию валидации вместимости
    });

    typeHousingElement.addEventListener('change', function () {
      validatePrice(); // Вызываем функцию валидации цены
    });

    checkinElement.addEventListener('change', function (evt) {
      validateChecks(evt); // Вызываем функцию валидации въезда
    });

    checkoutElement.addEventListener('change', function (evt) {
      validateChecks(evt); // Вызываем функцию валидации выезда
    });

    adFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var data = new FormData(adFormElement);

      window.backend.save(SAVE_URL, data, onSaveSuccess, onSaveError);
    });
  }

  function closeSuccess() {
    var successElement = document.querySelector('.success');

    successElement.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessPressEsc);
    successElement.remove();
  }

  function closeError() {
    var errorElement = document.querySelector('.error');

    errorElement.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onSuccessPressEsc);
    errorElement.remove();
  }

  function openSuccess() {
    var successElement = document.querySelector('#success')
    .content
    .querySelector('.success');

    adFormElement.reset();
    successElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessPressEsc);
    window.Util.renderElements(successElement, mainElement);
  }

  function openError() {
    var errorElement = document.querySelector('#error')
    .content
    .querySelector('.error');

    console.log(document.querySelector('#error'));

    errorElement.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorPressEsc);
    window.Util.renderElements(errorElement, mainElement);
  }

  function onSuccessPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeSuccess();
    }
  }

  function onSuccessClick() {
    closeSuccess();
  }

  function onErrorPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeError();
    }
  }

  function onErrorClick() {
    closeError();
  }

  function onSaveSuccess() {
    openSuccess();
  }

  function onSaveError() {
    openError();
  }

  window.form = {
    toggle: function (isLoadPage) {
      if (isLoadPage) {
        window.Util.toggleInputs(adFieldsetElements); // Заблокируем поля добавления объявления
      } else {
        adFormElement.classList.remove('ad-form--disabled'); // Разблокируем форму

        window.Util.toggleInputs(adFieldsetElements); // Разблокируем поля добавления объявления
        validateСapacities(); // Вызываем валидации вместимости
        hangHandlersValidates(); // Повесим обработчики валидации формы
      }
    }
  };
})();
