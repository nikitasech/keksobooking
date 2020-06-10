'use strict';

var map = {
  element: document.querySelector('.map'),
  pinsContainer: document.querySelector('.map__pins'),
};

var Data = {
  types: ['palace', 'flat', 'house', 'bungalo'],
  checkinsAndCheckouts: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArray(array) {
  var newArray = array.slice(0);

  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // Выбираем случайное число (0 ≤ j ≤ i)
    var swap = newArray[j]; // Записываем содержимое массива под индексом j в переменную
    newArray[j] = newArray[i]; // Под индексом j записываем значение индекса i
    newArray[i] = swap; // А под индексом i записываем сохранённое значение индекса j
  }

  var randomNumber = getRandomNumber(0, newArray.length); // Берём случайное число
  newArray = newArray.slice(randomNumber); // Убираем из массива случайное кол-во элементов

  return newArray;
}

function getAd(numberAd) {
  var x = getRandomNumber(0, map.pinsContainer.clientWidth); // Случайная координата по горизонтали
  var y = getRandomNumber(130, 630); // Случайная координата по вертикали

  return {
    author: {
      avatar: 'img/avatars/user0' + numberAd + '.png', // Генерируем ссылку на аватарку
    },

    offer: {
      title: 'Заголовок объявления',
      address: x + ', ' + y,
      price: getRandomNumber(500, 10000), // Генерируем случайную цену
      type: Data.types[getRandomNumber(0, Data.types.length)], // Выбираем случайный тип объявления
      rooms: getRandomNumber(1, 100), // Генерируем случайное кол-во комнат
      guests: getRandomNumber(0, 3), // Генерируем случайное кол-во гостей
      checkin: Data.checkinsAndCheckouts[getRandomNumber(0, Data.checkinsAndCheckouts.length)], // Случайно выбираем дату заезда
      checkout: Data.checkinsAndCheckouts[getRandomNumber(0, Data.checkinsAndCheckouts.length)], // Случайно выбираем дату выезда
      features: getRandomArray(Data.features), // Случайно генерируем особенности
      description: 'Описание объявления',
      photos: getRandomArray(Data.photos), // Случайно генерируем фото
    },

    location: {
      x: x,
      y: y,
    },
  };
}

function getAds(quantity) {
  var ads = []; // Создаём массив объявлений

  for (var ad = 0; ad < quantity; ad++) {
    var numberAd = ad + 1; // Номер текущего объявления

    ads.push(getAd(numberAd)); // Вставляем в массив текущее объявление
  }

  return ads; // Возвращаем массив
}

function createPinElement(object) {
  var template = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var pinElement = template.cloneNode(true); // Клонируем
  var pinAvatarElement = pinElement.querySelector('img'); // Находим img

  pinElement.style.left = object.location.x - pinElement.offsetWidth / 2 + 'px'; // Задаем координату по x
  pinElement.style.top = object.location.y - pinElement.offsetHeight + 'px'; // Задаем координату по y

  pinAvatarElement.src = object.author.avatar; // Задаём аватарку
  pinAvatarElement.alt = object.offer.description; // Задаём альтернативный текст

  return pinElement; // Возвращаем объявление
}

function renderPinsElements(arrayElements, container) {
  var fragment = document.createDocumentFragment(); // Создаём фрагмент

  for (var ad = 0; ad < arrayElements.length; ad++) {
    fragment.appendChild(arrayElements[ad]); // Вставляем во фрагмент элементы из массива
  }

  container.appendChild(fragment); // Вставляем фрагмент в разметку
}

map.element.classList.remove('map--faded');

var ads = getAds(8); // Создаём массив объявлений
var pinsElements = ads.map(createPinElement); // Формируем массив элементов меток
renderPinsElements(pinsElements, map.pinsContainer); // Отрисовываем тетки
