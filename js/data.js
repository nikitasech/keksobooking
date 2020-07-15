'use strict';

(function () {
  var NUMBER_ADS = 5;

  var pinsContainerElement = window.service.elements.pinsContainerElement;
  var mainElement = window.service.elements.mainElement;

  window.data = {
    onLoadSuccess: function (data) {
      var ads = data;
      var pinsElements = ads.map(window.pin.createElement); // Формируем массив элементов меток
      var cardsElements = ads.map(window.card.createElement); // Создаем массив из карточек

      window.map.addListenersPins(pinsElements, cardsElements); // Вешаем обработчики событий на метки из массива

      pinsElements.forEach(function (element) {
        element.classList.add('hidden');
      });

      window.Util.renderElements(pinsElements.slice(0, NUMBER_ADS), pinsContainerElement); // Отрисовываем метки
    },

    onLoadError: function (message) {
      var modalErrorElement = document.querySelector('#load-error')
      .content
      .querySelector('.load-error');

      modalErrorElement.textContent = message;

      window.Util.renderElements(modalErrorElement, mainElement);
    },
  };
})();
