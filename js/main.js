'use strict';

(function () {
  var mainPinElement = window.service.elements.mainPinElement;
  var adFieldsetElements = window.service.elements.adFieldsetElements;
  var adsFilterElements = window.service.elements.adsFilterElements;
  var addressFieldElement = window.service.elements.addressFieldElement;

  window.form.toggleInputs(adFieldsetElements); // Заблокируем поля добавления объявления
  window.form.toggleInputs(adsFilterElements); // Заблокируем поля фильтров

  addressFieldElement.value = window.mainPin.getPositionPin(mainPinElement); // Выставим адрес в нужное поле

  window.mainPin.hangHandlersMainPin(); // Вешаем обработчики на главную метку
  window.map.hangHandlerPins(); // Вешаем обработчики событий на метки из массива
})();
