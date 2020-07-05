'use strict';

(function () {
  var KeyCodes = window.service.KeyCodes;

  var mapElement = window.service.elements.mapElement;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  window.map = {
    closeCard: function () {
      var cardElement = mapElement.querySelector('.map__card'); // Находим карточку

      if (cardElement) {
        cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
      }

      document.removeEventListener('keydown', window.map.onCardPressEsc);
    },

    openCard: function (card) {
      window.map.closeCard(); // Закрываем предыдущюю карточку

      window.Util.renderElements(card, mapElement, filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами
      document.addEventListener('keydown', window.map.onCardPressEsc); // Обработчик на esc

      var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
      cardCloseButton.addEventListener('click', function () { // Обработчик на кнопку закрытия
        window.map.closeCard(); // Закрываем карточку
      });
    },

    onCardPressEsc: function (evt) {
      if (evt.code === KeyCodes.esc) {
        window.map.closeCard(); // Закрываем карточку
      }
    },

    hangHandlerPin: function (pin, card) {
      pin.addEventListener('click', function () { // Обработчик открытия карточки
        window.map.openCard(card); // Открытие карточки
      });

      pin.addEventListener('keydown', function (evt) { // Обработчик открытия на enter
        if (evt.keyCode === KeyCodes.enter) {
          window.map.openCard(card); // Открытие карточки
        }
      });
    },

    hangHandlerPins: function () {
      window.pinsElements.forEach(function (item, index) {
        window.map.hangHandlerPin(item, window.cardsElements[index]); // Вешаем на каждый маркер обработчики событий
      });
    },
  };
})();
