'use strict';

var map = {
  element: document.querySelector('.map'),
  pinsElement: document.querySelector('.map__pins'),

};

var data = {
  types: ['palace', 'flat', 'house', 'bungalo'],
  checkins: ['12:00', '13:00', '14:00'],
  checkouts: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArray(array) {
  var newArray = array.slice(0);

	for(var i = newArray.length - 1; i > 0; i--){
		var j = Math.floor(Math.random() * (i + 1)); // Выбираем случайное число (0 ≤ j ≤ i)
		var swap = newArray[j]; // Записываем содержимое массива под индексом j в переменную
		newArray[j] = newArray[i]; // Под индексом j записываем значение индекса i
		newArray[i] = swap; // А под индексом i записываем сохранённое значение индекса j
  }

  var randomNumber = getRandomNumber(0, newArray.length); // Берём случайное число
  newArray = newArray.slice(randomNumber); // Убираем из массива случайное кол-во элементов

	return newArray;
}

function Ad(avatarUrl, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, x, y) {
  this.author = {
    avatar: avatarUrl,
  },

  this.offer = {
    title: title,
    address: address,
    price: price,
    type: type,
    rooms: rooms,
    guests: guests,
    checkin: checkin,
    checkout: checkout,
    features: features,
    description: description,
    photos: photos,
  },

  this.location = {
    x: x,
    y: y,
  }
};

function getAd(numberAd) {
  var avatarUrl = 'img/avatars/user0' + numberAd + '.png'; // Генерируем ссылку на аватарку
  var title = 'Заголовок объявления';
  var price = getRandomNumber(500, 10000); // Генерируем случайную цену
  var type = data.types[getRandomNumber(0, data.types.length)]; // Выбираем случайный тип объявления
  var rooms = getRandomNumber(1, 100); // Генерируем случайное кол-во комнат
  var guests = getRandomNumber(0, 3); // Генерируем случайное кол-во гостей
  var checkin = data.checkins[getRandomNumber(0, data.checkins.length)]; // Случайно выбираем дату заезда
  var checkout = data.checkouts[getRandomNumber(0, data.checkouts.length)]; // И дату выезда
  var features = getRandomArray(data.features); // Случайно генерируем особенности
  var description = 'Описание объявления';
  var photos = getRandomArray(data.photos); // Случайно генерируем фото
  var x = getRandomNumber(0, map.pinsElement.clientWidth); // Случайная координата по горизонтали
  var y = getRandomNumber(130, 630); // Случайная координата по вертикали
  var address = x + ', ' + y;

  return new Ad (avatarUrl, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, x, y); // Возвращаем готовое объявление
}

function getAds(quantity) {
  var ads = []; // Создаём массив объявлений

  for (var ad = 0; ad < quantity; ad++) {
    var numberAd = ad + 1; // Номер текущего объявления

    ads.push(getAd(numberAd)); // Вставляем в массив текущее объявление
  }

  return ads; // Возвращаем массив
}

function createAd(object) {
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

function createAds(array) {
  var adsElements = []; // Создаём массив для объявлений

  for (var ad = 0; ad < array.length; ad++) {
    adsElements.push(createAd(array[ad])); // Вставляем в массив объявление
  }

  return adsElements; // Возвращаем массив
}

function renderAds(arrayElements, container) {
  var fragment = document.createDocumentFragment(); // Создаём фрагмент

  for (var ad = 0; ad < arrayElements.length; ad++) {
    fragment.appendChild(arrayElements[ad]); // Вставляем во фрагмент элементы из массива
  }

  container.appendChild(fragment); // Вставляем фрагмент в разметку
}

map.element.classList.remove('map--faded');

var ads = getAds(8);
var adsElements = createAds(ads);
renderAds(adsElements, map.pinsElement);
