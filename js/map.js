'use strict';

(function () {
  window.map = {
    onMainPinClick: function (evt) {
      if (!evt.button) { // Если номер нажатой кнопки мыши равен нулю
        window.main.togglePage(); // Вызываем разблокировку страницы
      }
    },

    onMainPinPressEnter: function (evt) {
      if (evt.code === window.service.KeyCodes.enter) { // Если нажата клавиша Enter
        window.main.togglePage(); // Вызываем разблокировку страницы
      }
    },

    onCardPressEsc: function (evt) {
      if (evt.code === window.service.KeyCodes.esc) {
        this.closeCard(); // Закрываем карточку
      }
    },

    hangHandlerPin: function (pin, card) {
      pin.addEventListener('click', function () { // Обработчик открытия карточки
        window.map.openCard(card); // Открытие карточки
      });

      pin.addEventListener('keydown', function (evt) { // Обработчик открытия на enter
        if (evt.keyCode === window.service.KeyCodes.enter) {
          window.map.openCard(card); // Открытие карточки
        }
      });
    },

    hangHandlerPins: function () {
      window.pinsElements.forEach(function (item, index) {
        window.map.hangHandlerPin(item, window.cardsElements[index]); // Вешаем на каждый маркер обработчики событий
      });
    },

    closeCard: function () {
      var cardElement = window.service.elements.mapElement.querySelector('.map__card'); // Находим карточку

      if (cardElement) {
        cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
      }

      document.removeEventListener('keydown', this.onCardPressEsc);
    },

    openCard: function (card) {
      this.closeCard(); // Закрываем предыдущюю карточку

      window.Util.renderElements(card, window.service.elements.mapElement, window.service.elements.filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами
      document.addEventListener('keydown', this.onCardPressEsc); // Обработчик на esc

      var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
      cardCloseButton.addEventListener('click', function () { // Обработчик на кнопку закрытия
        window.map.closeCard(); // Закрываем карточку
      });
    },
  };
})();
