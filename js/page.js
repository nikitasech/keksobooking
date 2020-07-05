'use strict';

(function () {
  var mapElement = window.service.elements.mapElement;
  var adFormElement = window.service.elements.adFormElement;
  var pinsContainerElement = window.service.elements.pinsContainerElement;
  var adFieldsetElements = window.service.elements.adFieldsetElements;
  var adsFilterElements = window.service.elements.adsFilterElements;

  var mainPinElement = window.service.elements.mainPinElement;
  var addressFieldElement = window.service.elements.addressFieldElement;
  var roomNumberElement = window.service.elements.roomNumberElement;
  var capacityElement = window.service.elements.capacityElement;
  var typeHousingElement = window.service.elements.typeHousingElement;
  var checkinElement = window.service.elements.checkinElement;
  var checkoutElement = window.service.elements.checkoutElement;

  window.page = {
    togglePage: function (loadPage) {
      if (!loadPage) {
        mapElement.classList.toggle('map--faded'); // Разблокируем карту
        adFormElement.classList.toggle('ad-form--disabled'); // Разблокируем форму
      }

      window.form.toggleInputs(adFieldsetElements); // Заблокируем/разблокируем поля добавления объявления
      window.form.toggleInputs(adsFilterElements); // Заблокируем/разблокируем поля фильтров

      window.form.validateСapacities(); // Вызываем функцию валидации вместимости

      if (mapElement.classList.contains('map--faded')) {
        mainPinElement.addEventListener('mousedown', window.mainPin.onMainPinClick); // Вешаем обработчик клика на метку
        mainPinElement.addEventListener('keydown', window.mainPin.onMainPinPressEnter); // Вешаем обработчик Enter на метку

      } else {
        mapElement.classList.remove('map--faded'); // Разблокируем карту
        adFormElement.classList.remove('ad-form--disabled'); // Разблокируем форму

        mainPinElement.removeEventListener('mousedown', window.mainPin.onMainPinClick); // Удаляем обработчик клика на метку
        mainPinElement.removeEventListener('keydown', window.mainPin.onMainPinPressEnter); // Удаляем обработчик Enter на метку

        roomNumberElement.addEventListener('change', function () {
          window.form.validateСapacities(); // Вызываем функцию валидации вместимости
        });

        capacityElement.addEventListener('change', function () {
          window.form.validateСapacities(); // Вызываем функцию валидации вместимости
        });

        typeHousingElement.addEventListener('change', function () {
          window.form.validatePrice(); // Вызываем функцию валидации цены
        });

        checkinElement.addEventListener('change', function (evt) {
          window.form.validateChecks(evt); // Вызываем функцию валидации въезда
        });

        checkoutElement.addEventListener('change', function (evt) {
          window.form.validateChecks(evt); // Вызываем функцию валидации выезда
        });

        window.Util.renderElements(window.pinsElements, pinsContainerElement); // Отрисовываем тетки
      }
    }
  };
})();
