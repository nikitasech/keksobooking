'use strict';

(function () {
  var KeyCodes = window.service.KeyCodes;

  var mapElement = window.service.elements.mapElement;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  function onCardPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeCard(); // Закрываем карточку
    }
  }

  function closeCard() {
    var cardElement = mapElement.querySelector('.map__card'); // Находим карточку

    if (cardElement) {
      cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
    }

    document.removeEventListener('keydown', onCardPressEsc);
  }

  function openCard(card) {
    closeCard(); // Закрываем предыдущюю карточку

    window.Util.renderElements(card, mapElement, filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами

    var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
    cardCloseButton.addEventListener('click', function () { // Обработчик закрытия на крестик
      closeCard();
    });

    document.addEventListener('keydown', onCardPressEsc); // Обработчик закрытия на esc
  }

  function addListnerPin(pin, card) {
    pin.addEventListener('click', function () { // Обработчик открытия карточки
      openCard(card);
    });

    pin.addEventListener('keydown', function (evt) { // Обработчик открытия на enter
      if (evt.keyCode === KeyCodes.ENTER) {
        openCard(card);
      }
    });
  }

  window.map = {
    toggle: function (isLoadPage) {
      var pinsElements = mapElement.querySelectorAll('.map__pin');

      // Если это не загрузка страницы то переключаем состояние карты
      if (!isLoadPage) {
        mapElement.classList.toggle('map--faded');
      }

      // Если карта неактивна
      if (mapElement.classList.contains('map--faded')) {
        window.mainPin.addListeners(); // Добавим обработчики на клавную метку

        // Проходимся по пинам и скрываем их, игнорируя первый
        pinsElements.forEach(function (pin, index) {
          if (index) {
            pin.classList.add('hidden');
          }
        });
      } else {
        window.mainPin.removeListeners(); // Удалим обработчики с клавной метки

        pinsElements.forEach(function (pin) {
          pin.classList.remove('hidden'); // Показываем все пины
        });
      }
    },

    addListenersPins: function (pins, cards) {
      pins.forEach(function (item, index) {
        addListnerPin(item, cards[index]); // Вешаем на каждый маркер обработчики событий
      });
    },
  };
})();
