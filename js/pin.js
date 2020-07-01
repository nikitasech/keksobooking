'use strict';

(function () {
  function createPinElement(object) {
    var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var pinElement = template.cloneNode(true); // Клонируем
    var pinAvatarElement = pinElement.querySelector('img'); // Находим img

    pinElement.style.left = object.location.x - window.service.Pin.WIDTH / 2 + 'px'; // Задаем координату по x
    pinElement.style.top = object.location.y - window.service.Pin.HEIGHT + 'px'; // Задаем координату по y

    pinAvatarElement.src = object.author.avatar; // Задаём аватарку
    pinAvatarElement.alt = object.offer.description; // Задаём альтернативный текст

    return pinElement; // Возвращаем объявление
  }

  window.pinsElements = window.ads.map(createPinElement); // Формируем массив элементов меток
})();
