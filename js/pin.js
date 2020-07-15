'use strict';

(function () {
  var Pin = window.service.Pin;

  window.pin = {
    createElement: function (object) {
      var template = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

      var pinElement = template.cloneNode(true); // Клонируем
      var pinAvatarElement = pinElement.querySelector('img'); // Находим img

      pinElement.style.left = object.location.x - Pin.WIDTH / 2 + 'px'; // Задаем координату по x
      pinElement.style.top = object.location.y - Pin.HEIGHT + 'px'; // Задаем координату по y

      pinAvatarElement.src = object.author.avatar; // Задаём аватарку
      pinAvatarElement.alt = object.offer.description; // Задаём альтернативный текст

      return pinElement; // Возвращаем объявление
    }
  };
})();
