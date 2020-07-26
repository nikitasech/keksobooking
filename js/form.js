'use strict';

(function () {
  var SAVE_URL = 'https://javascript.pages.academy/keksobooking';

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
  var сhooserAvatarElement = document.querySelector('.ad-form-header__input');
  var сhooserPhotoElement = document.querySelector('.ad-form__input');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview > img');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var previewPhotoElement = photoContainerElement.querySelector('.ad-form__photo');

  var typeToMinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
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
    throwOff();
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
    priceElement.placeholder = typeToMinPrice[typeHousingElement.value];
    priceElement.min = typeToMinPrice[typeHousingElement.value];
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
    window.backend.askResponce('POST', SAVE_URL, onSaveSuccess, onSaveError, data);
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

  function onAvatarChange(evt) {
    window.preview.download(previewAvatarElement, evt.currentTarget);
  }

  function onPtotoHouseChange(evt) {
    var previewPhotoClone = previewPhotoElement.cloneNode(false);
    previewPhotoElement.remove();

    var imagePhoto = new Image(40, 44);
    window.preview.download(imagePhoto, evt.currentTarget);
    previewPhotoClone.appendChild(imagePhoto);
    window.Util.renderElements(previewPhotoClone, photoContainerElement);
  }

  function addListenersForm() {
    typeHousingElement.addEventListener('change', onPriceChange); // Добавляем обработчик валидации цены
    checkinElement.addEventListener('change', onChecksChange); // Добавляем обработчик валидации заезда
    checkoutElement.addEventListener('change', onChecksChange); // Добавляем обработчик валидации выезда
    roomNumberElement.addEventListener('change', onCapacitiesChange); // Добавляем обработчик валидации кол-ва комнат
    capacityElement.addEventListener('change', onCapacitiesChange); // Добавляем обработчик валидации вместимости
    сhooserAvatarElement.addEventListener('change', onAvatarChange); // Добавляем обработчик добавления аватара
    сhooserPhotoElement.addEventListener('change', onPtotoHouseChange); // Добавляем обработчик добавления фотографий объявления
    adFormElement.addEventListener('submit', onFormSubmit); // Добавляем обработчик отправки формы
    adFormResetElement.addEventListener('click', onReset); // Добавляем обработчик сброса
  }

  function removeListenersForm() {
    typeHousingElement.removeEventListener('change', onPriceChange); // Удляем обработчик валидации цены
    checkinElement.removeEventListener('change', onChecksChange); // Удляем обработчик валидации заезда
    checkoutElement.removeEventListener('change', onChecksChange); // Удляем обработчик валидации выезда
    roomNumberElement.removeEventListener('change', onCapacitiesChange); // Удляем обработчик валидации кол-ва комнат
    capacityElement.removeEventListener('change', onCapacitiesChange); // Удляем обработчик валидации вместимости
    сhooserAvatarElement.removeEventListener('change', onAvatarChange); // Удляем обработчик добавления аватара
    сhooserPhotoElement.removeEventListener('change', onPtotoHouseChange); // Удляем обработчик добавления фотографий объявления
    adFormElement.removeEventListener('submit', onFormSubmit); // Удляем обработчик отправки формы
    adFormResetElement.removeEventListener('click', onReset); // Удляем обработчик сброса
  }

  function openSuccess() {
    // Находим и клонируем шаблон окна успешной отправки формы
    var template = document.querySelector('#success')
    .content
    .querySelector('.success');
    var successElement = template.cloneNode(true);

    // Сбрасываем форму
    adFormElement.reset();

    // Вешаем обработчики скрытия окна успешной отправки
    successElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessPressEsc);

    // Отрисовываем шаблон
    window.Util.renderElements(successElement, mainElement);
  }

  function closeSuccess() {
    // Находим шаблон окна успешной отправки формы
    var successElement = document.querySelector('.success');

    // Удаляем обработчики с окна
    successElement.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessPressEsc);

    // Удаляем окно
    successElement.remove();
  }

  function toggleForm() {
    adFormElement.classList.toggle('ad-form--disabled'); // Разблокируем форму

    if (adFormElement.classList.contains('ad-form--disabled')) {
      window.Util.toggleInputs(adFieldsetElements); // Заблокируем поля добавления объявления
      removeListenersForm(); // Удаляем обработчики формы
    } else {
      window.Util.toggleInputs(adFieldsetElements); // Разблокируем поля добавления объявления
      validateСapacities(); // Вызываем валидации вместимости
      validatePrice(); // Вызываем валидацию цены
      addListenersForm(); // Повесим обработчики формы
    }
  }

  window.form = {
    toggle: toggleForm
  };
})();
