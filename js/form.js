'use strict';

(function () {
  var SAVE_URL = 'https://javasfcript.pages.academy/keksobooking';

  var mainPinElement = window.service.elements.mainPinElement;
  var mainElement = window.service.elements.mainElement;
  var adFormElement = window.service.elements.adFormElement;
  var adFieldsetElements = window.service.elements.adFieldsetElements;
  var addressFieldElement = window.service.elements.addressFieldElement;
  var capacityElement = window.service.elements.capacityElement;
  var roomNumberElement = window.service.elements.roomNumberElement;
  var typeHousingElement = window.service.elements.typeHousingElement;
  var priceElement = window.service.elements.priceElement;
  var checkoutElement = window.service.elements.checkoutElement;
  var checkinElement = window.service.elements.checkinElement;
  var filtersElement = window.service.elements.filtersFormElement;
  var adFormResetElement = adFormElement.querySelector('.ad-form__reset');

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var Pin = window.service.Pin;
  var KeyCodes = window.service.KeyCodes;

  function openError() {
    var template = document.querySelector('#error')
    .content
    .querySelector('.error');

    var errorElement = template.cloneNode(true);
    var buttonElement = errorElement.querySelector('.error__button');

    errorElement.addEventListener('click', onErrorClick);
    buttonElement.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorPressEsc);

    window.Util.renderElements(errorElement, mainElement);
  }

  function closeError() {
    var errorElement = document.querySelector('.error');
    var buttonElement = errorElement.querySelector('.error__button');

    errorElement.removeEventListener('click', onErrorClick);
    buttonElement.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onSuccessPressEsc);

    errorElement.remove();
  }

  function onSaveSuccess() {
    openSuccess();
  }

  function onSaveError() {
    openError();
  }

  function onSuccessClick(evt) {
    var messageElement = document.querySelector('.success__message');

    if (evt.target !== messageElement) {
      closeSuccess();
    }
  }

  function onSuccessPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeSuccess();
    }
  }

  function onErrorClick(evt) {
    var messageElement = document.querySelector('.error__message');

    if (evt.target !== messageElement) {
      closeError();
    }
  }

  function onErrorPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeError();
    }
  }

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

  function onPriceChange() {
    validatePrice();
  }

  function onChecksChange(evt) {
    validateChecks(evt);
  }

  function onCapacitiesChange() {
    validateСapacities();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    var data = new FormData(adFormElement);

    window.backend.save(SAVE_URL, data, onSaveSuccess, onSaveError);
  }

  function throwOff() {
    window.map.toggle();
    mainPinElement.style.left = Pin.SORCE_X + 'px';
    mainPinElement.style.top = Pin.SORCE_Y + 'px';

    window.form.toggle();
    adFormElement.reset();
    addressFieldElement.value = window.mainPin.getPosition(mainPinElement);

    window.filter.toggle();
    filtersElement.reset();
  }

  function onReset(evt) {
    evt.preventDefault();
    throwOff();
  }

  function addListenersForm() {
    typeHousingElement.addEventListener('change', onPriceChange); // Добавляем обработчик валидации цены
    checkinElement.addEventListener('change', onChecksChange); // Добавляем обработчик валидации заезда
    checkoutElement.addEventListener('change', onChecksChange); // Добавляем обработчик валидации выезда
    roomNumberElement.addEventListener('change', onCapacitiesChange); // Добавляем обработчик валидации кол-ва комнат
    capacityElement.addEventListener('change', onCapacitiesChange); // Добавляем обработчик валидации вместимости
    adFormElement.addEventListener('submit', onFormSubmit); // Добавляем обработчик отправки формы
    adFormResetElement.addEventListener('click', onReset); // Добавляем обработчик сброса
  }

  function removeListenersForm() {
    typeHousingElement.removeEventListener('change', onPriceChange); // Удляем обработчик валидации цены
    checkinElement.removeEventListener('change', onChecksChange); // Удляем обработчик валидации заезда
    checkoutElement.removeEventListener('change', onChecksChange); // Удляем обработчик валидации выезда
    roomNumberElement.removeEventListener('change', onCapacitiesChange); // Удляем обработчик валидации кол-ва комнат
    capacityElement.removeEventListener('change', onCapacitiesChange); // Удляем обработчик валидации вместимости
    adFormElement.removeEventListener('submit', onFormSubmit); // Удляем обработчик отправки формы
    adFormResetElement.removeEventListener('click', onReset); // Удляем обработчик сброса
  }

  function openSuccess() {
    var template = document.querySelector('#success')
    .content
    .querySelector('.success');

    var successElement = template.cloneNode(true);

    adFormElement.reset();
    successElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessPressEsc);
    window.Util.renderElements(successElement, mainElement);
  }

  function closeSuccess() {
    var successElement = document.querySelector('.success');

    successElement.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessPressEsc);
    successElement.remove();
  }

  window.form = {
    toggle: function () {
      adFormElement.classList.toggle('ad-form--disabled'); // Разблокируем форму

      if (adFormElement.classList.contains('ad-form--disabled')) {
        window.Util.toggleInputs(adFieldsetElements); // Заблокируем поля добавления объявления
        removeListenersForm(); // Удаляем обработчики формы
      } else {
        window.Util.toggleInputs(adFieldsetElements); // Разблокируем поля добавления объявления
        validateСapacities(); // Вызываем валидации вместимости
        addListenersForm(); // Повесим обработчики формы
      }
    }
  };
})();
