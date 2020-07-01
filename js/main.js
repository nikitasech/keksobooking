'use strict';

(function () {
  function getPositionPin(element) {
    var positionX = element.offsetLeft + window.service.Pin.WIDTH / 2; // Отступ слева + половина ширины метки
    var positionY = element.offsetTop + window.service.Pin.HEIGHT; // Отступ всерху + высота метки

    if (window.service.elements.mapElement.classList.contains('map--faded')) { // Если карта заблокирована
      positionY = element.offsetTop + window.service.Pin.WIDTH / 2; // Отступ сверху + половина высоты без иголки
    }

    return Math.floor(positionX) + ', ' + Math.floor(positionY);
  }

  window.main = {
    togglePage: function (loadPage) {
      if (!loadPage) {
        window.service.elements.mapElement.classList.toggle('map--faded'); // Разблокируем карту
        window.service.elements.adFormElement.classList.toggle('ad-form--disabled'); // Разблокируем форму
      }

      window.form.toggleInputs(window.service.elements.adFieldsetElements); // Заблокируем/разблокируем поля добавления объявления
      window.form.toggleInputs(window.service.elements.adsFilterElements); // Заблокируем/разблокируем поля фильтров

      window.form.validateСapacities(); // Вызываем функцию валидации вместимости
      window.service.elements.addressFieldElement.value = getPositionPin(window.service.elements.mainPinElement); // Указываем текущее расположение метки в поле адреса

      if (window.service.elements.mapElement.classList.contains('map--faded')) {
        window.service.elements.mainPinElement.addEventListener('mousedown', window.map.onMainPinClick); // Вешаем обработчик клика на метку
        window.service.elements.mainPinElement.addEventListener('keydown', window.map.onMainPinPressEnter); // Вешаем обработчик Enter на метку

      } else {
        window.service.elements.mapElement.classList.remove('map--faded'); // Разблокируем карту
        window.service.elements.adFormElement.classList.remove('ad-form--disabled'); // Разблокируем форму

        window.service.elements.mainPinElement.removeEventListener('mousedown', window.map.onMainPinClick); // Удаляем обработчик клика на метку
        window.service.elements.mainPinElement.removeEventListener('keydown', window.map.onMainPinPressEnter); // Удаляем обработчик Enter на метку

        window.service.elements.mainPinElement.removeEventListener('mousedown', window.map.onMainPinClick); // Удаляем обработчик клика на метку
        window.service.elements.mainPinElement.removeEventListener('keydown', window.map.onMainPinPressEnter); // Удаляем обработчик Enter на метку

        window.service.elements.roomNumberElement.addEventListener('change', function () {
          window.form.validateСapacities(); // Вызываем функцию валидации вместимости
        });

        window.service.elements.capacityElement.addEventListener('change', function () {
          window.form.validateСapacities(); // Вызываем функцию валидации вместимости
        });

        window.service.elements.typeHousingElement.addEventListener('change', function () {
          window.form.validatePrice();
        });

        window.service.elements.checkinElement.addEventListener('change', function (evt) {
          window.form.validateChecks(evt);
        });

        window.service.elements.checkoutElement.addEventListener('change', function (evt) {
          window.form.validateChecks(evt);
        });

        window.Util.renderElements(window.pinsElements, window.service.elements.pinsContainerElement); // Отрисовываем тетки
      }
    }
  };

  window.map.hangHandlerPins();
  window.main.togglePage(true); // Блокируем нашу страницу

})();
