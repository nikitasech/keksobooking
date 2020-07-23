'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';

  var mainPinElement = window.service.elements.mainPinElement;
  var addressFieldElement = window.service.elements.addressFieldElement;
  var adFieldsetElements = window.service.elements.adFieldsetElements;
  var adsFilterElements = window.service.elements.adsFilterElements;

  window.Util.toggleInputs(adFieldsetElements);
  window.Util.toggleInputs(adsFilterElements);

  window.backend.askResponce('GET', LOAD_URL, window.data.onLoadSuccess, window.data.onLoadError);
  addressFieldElement.value = window.mainPin.getPosition(mainPinElement); // Выставим адрес в нужное поле
  window.mainPin.addListeners(); // Вешаем обработчики на главную метку
})();
