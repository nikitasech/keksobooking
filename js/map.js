'use strict';

(function () {
  var KeyCodes = window.service.KeyCodes;

  var mapElement = window.service.elements.mapElement;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  function onCardPressEsc(evt) {
    if (evt.code === KeyCodes.esc) {
      closeInfoCard(); // Закрываем карточку
    }
  }

  function closeInfoCard() {
    var cardElement = mapElement.querySelector('.map__card'); // Находим карточку

    if (cardElement) {
      cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
    }

    document.removeEventListener('keydown', onCardPressEsc);
  }

  function openInfoCard(card) {
    closeInfoCard(); // Закрываем предыдущюю карточку

    window.Util.renderElements(card, mapElement, filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами

    var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
    cardCloseButton.addEventListener('click', function () { // Обработчик закрытия на крестик
      closeInfoCard();
    });

    document.addEventListener('keydown', onCardPressEsc); // Обработчик закрытия на esc
  }

  function hangHandlerPin(pin, card) {
    pin.addEventListener('click', function () { // Обработчик открытия карточки
      openInfoCard(card);
    });

    pin.addEventListener('keydown', function (evt) { // Обработчик открытия на enter
      if (evt.keyCode === KeyCodes.enter) {
        openInfoCard(card);
      }
    });
  }

  window.map = {
    hangHandlerPins: function () {
      window.pinsElements.forEach(function (item, index) {
        hangHandlerPin(item, window.cardsElements[index]); // Вешаем на каждый маркер обработчики событий
      });
    },
  };
})();
