'use strict';

(function () {
  var mainPinElement = window.service.elements.mainPinElement;

  var mapElement = window.service.elements.mapElement;
  var adFormElement = window.service.elements.adFormElement;
  var pinsContainerElement = window.service.elements.pinsContainerElement;

  var adFieldsetElements = window.service.elements.adFieldsetElements;
  var adsFilterElements = window.service.elements.adsFilterElements;

  window.page = {
    unblockPage: function () {
      mapElement.classList.remove('map--faded'); // Разблокируем карту
      adFormElement.classList.remove('ad-form--disabled'); // Разблокируем форму

      window.form.toggleInputs(adFieldsetElements); // Разблокируем поля добавления объявления
      window.form.toggleInputs(adsFilterElements); // Разблокируем поля фильтров

      window.form.validateСapacities(); // Вызываем функцию валидации вместимости

      mainPinElement.removeEventListener('mousedown', window.mainPin.onMainPinClick); // Удаляем обработчик клика на метку
      mainPinElement.removeEventListener('keydown', window.mainPin.onMainPinPressEnter); // Удаляем обработчик Enter на метку

      window.form.hangHandlersValidates(); // Повесим обработчики валидации формы

      window.Util.renderElements(window.pinsElements, pinsContainerElement); // Отрисовываем тетки
    }
  };
})();
