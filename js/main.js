'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';

  var mainPinElement = window.service.elements.mainPinElement;
  var addressFieldElement = window.service.elements.addressFieldElement;

  window.backend.load(LOAD_URL, window.data.onLoadSuccess, window.data.onLoadError);
  addressFieldElement.value = window.mainPin.getPosition(mainPinElement); // Выставим адрес в нужное поле
  window.mainPin.addListeners(); // Вешаем обработчики на главную метку
})();
