'use strict';

var NUMBER_ADS = 8;

var map = {
  element: document.querySelector('.map'),
  pinsContainerElement: document.querySelector('.map__pins'),
  filtersContainerElement: document.querySelector('.map__filters-container'),
  Y_TOP_LIMIT: 130,
  Y_BOTTOM_LIMIT: 630,
};

var Data = {
  types: ['palace', 'flat', 'house', 'bungalo'],
  checks: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  TypesTranslate: {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  },
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
  var numberAvatar = numberAd < 10 ? '0' + numberAd : numberAd;
  var x = getRandomNumber(0, map.pinsContainerElement.clientWidth); // Случайная координата по горизонтали
  var y = getRandomNumber(map.Y_TOP_LIMIT, map.Y_BOTTOM_LIMIT); // Случайная координата по вертикали

  return {
    author: {
      avatar: 'img/avatars/user' + numberAvatar + '.png', // Генерируем ссылку на аватарку
    },

    offer: {
      title: 'Заголовок объявления',
      address: x + ', ' + y,
      price: getRandomNumber(500, 10000), // Генерируем случайную цену
      type: Data.types[getRandomNumber(0, Data.types.length)], // Выбираем случайный тип объявления
      rooms: getRandomNumber(1, 100), // Генерируем случайное кол-во комнат
      guests: getRandomNumber(0, 3), // Генерируем случайное кол-во гостей
      checkin: Data.checks[getRandomNumber(0, Data.checks.length)], // Случайно выбираем дату заезда
      checkout: Data.checks[getRandomNumber(0, Data.checks.length)], // Случайно выбираем дату выезда
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

function createCardElement(object) {
  var template = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var cardElement = template.cloneNode(true);
  var cardTitleElement = cardElement.querySelector('.popup__title');
  var cardAddressElement = cardElement.querySelector('.popup__text--address');
  var cardPriceElement = cardElement.querySelector('.popup__text--price');
  var cardTypeElement = cardElement.querySelector('.popup__type');
  var cardCapacityElement = cardElement.querySelector('.popup__text--capacity');
  var cardTimeElement = cardElement.querySelector('.popup__text--time');
  var cardFeatureselement = cardElement.querySelector('.popup__features');
  var cardDescriptionElement = cardElement.querySelector('.popup__description');
  var cardPhotosElement = cardElement.querySelector('.popup__photos');
  var cardAvatarElement = cardElement.querySelector('.popup__avatar');

  cardTitleElement.textContent = object.offer.title;
  cardAddressElement.textContent = object.offer.address;
  cardPriceElement.textContent = object.offer.price + '₽/ночь';
  cardTypeElement.textContent = Data.TypesTranslate[object.offer.type];
  cardCapacityElement.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  cardTimeElement.textContent = 'заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;
  cardFeatureselement.textContent = '**Удобства**';
  cardDescriptionElement.textContent = object.offer.description;
  cardPhotosElement.textContent = '**Фотографии**';
  cardAvatarElement.src = object.author.avatar;

  return cardElement;
}

function renderElements(elements, container, insertBefore) {
  var fragment = document.createDocumentFragment(); // Создаём фрагмент

  if (Array.isArray(elements)) {
    for (var ad = 0; ad < elements.length; ad++) {
      fragment.appendChild(elements[ad]); // Вставляем во фрагмент элементы из массива
    }
  } else {
    fragment.appendChild(elements); // Вставляем во фрагмент элемент
  }

  if (insertBefore) {
    container.insertBefore(fragment, insertBefore);
  } else {
    container.appendChild(fragment); // Вставляем фрагмент в разметку
  }
}

map.element.classList.remove('map--faded');

var ads = getAds(NUMBER_ADS); // Создаём массив объявлений
var pinsElements = ads.map(createPinElement); // Формируем массив элементов меток
renderElements(pinsElements, map.pinsContainerElement); // Отрисовываем тетки

var cardsElements = ads.map(createCardElement); // Создаем массив из карточек

renderElements(cardsElements[0], map.element, map.filtersContainerElement); // Отрисовываем карточку первого объявления перед фильтрами
