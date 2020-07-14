'use strict';

(function () {
  var mapElement = window.service.elements.mapElement;
  var mainPinElement = window.service.elements.mainPinElement;
  var addressFieldElement = window.service.elements.addressFieldElement;

  var Pin = window.service.Pin;
  var MapLimits = window.service.MapLimits;
  var KeyCodes = window.service.KeyCodes;

  function getPositionXPin(element) {
    return element.offsetLeft + Pin.WIDTH / 2; // Отступ слева + половина ширины метки
  }

  function getPositionYPin(element) {
    return element.offsetTop + Pin.HEIGHT; // Отступ всерху + высота метки
  }

  function onMainPinClick(evt) {
    if (!evt.button) { // Если номер нажатой кнопки мыши равен нулю
      window.map.toggle(); // Разблокируем карту
      window.filter.toggle(); // Разблокируем фильтры
      window.form.toggle(); // Разблокируем форму
    }
  }

  function onMainPinPressEnter(evt) {
    if (evt.code === KeyCodes.enter) { // Если нажата клавиша Enter
      window.map.toggle(); // Разблокируем карту
      window.filter.toggle(); // Разблокируем фильтры
      window.form.toggle(); // Разблокируем форму
    }
  }

  function movePin(evt) {
    evt.preventDefault();

    // Записываем текуше координаты мыши в объект
    var coordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onPinMove(evtMove) {
      evtMove.preventDefault();

      // Разница координат между текущим положением мыши и записанным ранее
      var shift = {
        x: evtMove.clientX - coordinates.x,
        y: evtMove.clientY - coordinates.y,
      };

      // Теперь обновляем координаты
      coordinates = {
        x: evtMove.clientX,
        y: evtMove.clientY,
      };

      // Координаты метки
      var coordinatesPin = {
        x: mainPinElement.offsetLeft + shift.x,
        y: mainPinElement.offsetTop + shift.y,
      };

      if (coordinatesPin.x < (MapLimits.LEFT - Pin.WIDTH / 2)) { // Если координаты метки по X меньше левого лимита и половины ширины метки...
        coordinatesPin.x = MapLimits.LEFT - Pin.WIDTH / 2 + 1; // ...выставляем максимально возможные координаты (Прибовляется 1, так как далее координата по X округляются в меньшую сторону)

      } else if (coordinatesPin.x > (MapLimits.RIGHT - Pin.WIDTH / 2)) { // Если координаты метки по X больше правого лимита и половины ширины метки...
        coordinatesPin.x = MapLimits.RIGHT - Pin.WIDTH / 2; // ...выставляем максимально возможные координаты
      }

      if (coordinatesPin.y <= (MapLimits.TOP - Pin.HEIGHT)) { // Если координаты метки по Y меньше верхнего лимита и высоты метки...
        coordinatesPin.y = MapLimits.TOP - Pin.HEIGHT; // ...выставляем максимально возможные координаты

      } else if (coordinatesPin.y >= (MapLimits.BOTTOM - Pin.HEIGHT)) { // Если координаты метки по Y больше нижнего лимита и высоты метки...
        coordinatesPin.y = MapLimits.BOTTOM - Pin.HEIGHT; // ...выставляем максимально возможные координаты
      }

      addressFieldElement.value = window.mainPin.getPosition(mainPinElement); // Указываем текущее расположение метки в поле адреса

      mainPinElement.style.left = coordinatesPin.x + 'px';
      mainPinElement.style.top = coordinatesPin.y + 'px';
    }

    function onPinUp() {
      document.removeEventListener('mousemove', onPinMove); // Удаляем обработчик движения
      document.removeEventListener('mouseup', onPinUp); // Удаляем обработчик удаления обработчиков :D

      addressFieldElement.value = window.mainPin.getPosition(mainPinElement); // Указываем текущее расположение метки в поле адреса
    }

    document.addEventListener('mousemove', onPinMove); // Добавляем обработчик движения
    document.addEventListener('mouseup', onPinUp); // Добавляем обработчик удаления обработчиков
  }

  window.mainPin = {
    addListeners: function () {
      mainPinElement.addEventListener('mousedown', onMainPinClick); // Вешаем обработчик клика на метку
      mainPinElement.addEventListener('keydown', onMainPinPressEnter); // Вешаем обработчик Enter на метку

      mainPinElement.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        if (!evt.button) { // Если номер нажатой кнопки мыши равен нулю
          movePin(evt); // Вызываем передвижение
        }
      });
    },

    removeListeners: function () {
      mainPinElement.removeEventListener('mousedown', onMainPinClick); // Удаляем обработчик клика на метку
      mainPinElement.removeEventListener('keydown', onMainPinPressEnter); // Удаляем обработчик Enter на метку
    },

    getPosition: function (element) {
      var positionX = getPositionXPin(element);
      var positionY = getPositionYPin(element);

      if (mapElement.classList.contains('map--faded')) { // Если карта заблокирована
        positionY = element.offsetTop + Pin.WIDTH / 2; // Отступ сверху + половина высоты без иголки
      }

      return Math.floor(positionX) + ', ' + Math.floor(positionY);
    },
  };
})();
