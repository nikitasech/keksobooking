'use strict';

(function () {
  var KeyCodes = window.service.KeyCodes;
  var Pin = window.service.Pin;

  var mapElement = window.service.elements.mapElement;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  window.map = {
    onMainPinClick: function (evt) {
      if (!evt.button) { // Если номер нажатой кнопки мыши равен нулю
        window.page.togglePage(); // Вызываем разблокировку страницы
      }
    },

    onMainPinPressEnter: function (evt) {
      if (evt.code === KeyCodes.enter) { // Если нажата клавиша Enter
        window.page.togglePage(); // Вызываем разблокировку страницы
      }
    },

    onCardPressEsc: function (evt) {
      if (evt.code === KeyCodes.esc) {
        this.closeCard(); // Закрываем карточку
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

    closeCard: function () {
      var cardElement = mapElement.querySelector('.map__card'); // Находим карточку

      if (cardElement) {
        cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
      }

      document.removeEventListener('keydown', this.onCardPressEsc);
    },

    openCard: function (card) {
      this.closeCard(); // Закрываем предыдущюю карточку

      window.Util.renderElements(card, mapElement, filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами
      document.addEventListener('keydown', this.onCardPressEsc); // Обработчик на esc

      var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
      cardCloseButton.addEventListener('click', function () { // Обработчик на кнопку закрытия
        window.map.closeCard(); // Закрываем карточку
      });
    },

    getPositionPin: function (element) {
      var positionX = element.offsetLeft + Pin.WIDTH / 2; // Отступ слева + половина ширины метки
      var positionY = element.offsetTop + Pin.HEIGHT; // Отступ всерху + высота метки

      if (mapElement.classList.contains('map--faded')) { // Если карта заблокирована
        positionY = element.offsetTop + Pin.WIDTH / 2; // Отступ сверху + половина высоты без иголки
      }

      return Math.floor(positionX) + ', ' + Math.floor(positionY);
    },
  };
})();
