'use strict';

(function () {
  var MAX_NUMBER_ADS = window.service.MAX_NUMBER_ADS;
  var KeyCodes = window.service.KeyCodes;
  var mapElement = window.service.elements.mapElement;
  var pinsContainerElement = window.service.elements.pinsContainerElement;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  function onCardPressEsc(evt) {
    if (evt.code === KeyCodes.ESC) {
      closeCard(); // Закрываем карточку
    }
  }

  function closeCard() {
    var cardElement = mapElement.querySelector('.map__card'); // Находим карточку
    var pinElement = mapElement.querySelector('.map__pin--active');

    if (cardElement) {
      cardElement.remove(); // Удаляем из разметки все старые объявления если они есть
    }
    if (pinElement) {
      pinElement.classList.remove('map__pin--active'); // Удаляем класс активного пина
    }

    document.removeEventListener('keydown', onCardPressEsc);
  }

  function openCard(card, pin) {
    closeCard(); // Закрываем предыдущюю карточку

    pin.classList.add('map__pin--active');
    window.Util.renderElements(card, mapElement, filtersContainerElement); // Отрисовываем карточку нужного объявления перед фильтрами

    var cardCloseButton = document.querySelector('.popup__close'); // Найдём кнопку закрытия
    cardCloseButton.addEventListener('click', function () { // Обработчик закрытия на крестик
      closeCard();
    });

    document.addEventListener('keydown', onCardPressEsc); // Обработчик закрытия на esc
  }

  function addListnerPin(pin, card) {
    pin.addEventListener('click', function () { // Обработчик открытия карточки
      openCard(card, pin);
    });

    pin.addEventListener('keydown', function (evt) { // Обработчик открытия на enter
      if (evt.keyCode === KeyCodes.ENTER) {
        openCard(card, pin);
      }
    });
  }

  function toggleMap(isLoadPage) {
    var pinsElements = mapElement.querySelectorAll('.map__pin');

    closeCard(); // Закрываем карточку
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
  }

  function renderPins(data) {
    var pinsElements = pinsContainerElement.querySelectorAll('.map__pin');

    // Создаем массивы элементов меток и карточек
    var pins = data.map(window.pin.createElement);
    var cards = data.map(window.card.createElement);

    window.map.addListenersPins(pins, cards); // Вешаем обработчики кликов на маркеры

    // Удаление старых маркеров и карточек
    pinsElements.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
    closeCard();

    window.Util.renderElements(pins.slice(0, MAX_NUMBER_ADS), pinsContainerElement); // Отрисовываем маркеры
  }

  function addListenersPins(pins, cards) {
    // Вешаем на каждый маркер обработчики событий
    pins.forEach(function (item, index) {
      addListnerPin(item, cards[index]);
    });
  }

  window.map = {
    toggle: toggleMap,
    renderPins: renderPins,
    addListenersPins: addListenersPins,
  };
})();
