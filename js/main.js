'use strict';

var Data = {
  types: ['palace', 'flat', 'house', 'bungalo'],
  checks: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  TypesTranslate: {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  },
};

var KeyCodes = {
  enter: 'Enter',
};

var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');
var pinsContainerElement = mapElement.querySelector('.map__pins');
// var filtersContainerElement = document.querySelector('.map__filters-container');

var adsFilterElements = mapElement.querySelectorAll('.map__filters > *');

var adFormElement = document.querySelector('.ad-form');

var adFieldsetElements = adFormElement.querySelectorAll('fieldset');
var addressFieldElement = adFormElement.querySelector('#address');
var roomNumberElement = adFormElement.querySelector('#room_number');
var capacityElement = adFormElement.querySelector('#capacity');

var MAP_Y_TOP_LIMIT = 130;
var MAP_Y_BOTTOM_LIMIT = 630;

var PIN_WIDTH = mainPinElement.offsetWidth; // Берём ширину метки и записываем в переменную
var PIN_HEIGHT = PIN_WIDTH + 10; // Высота метки + высота иголки

var NUMBER_ADS = 8;
// var INDEX_NECESSARY_CARD = 0;

function onMainPinClick(evt) {
  if (!evt.button) { // Если номер нажатой кнопки мыши равен нулю
    togglePage(); // Вызываем разблокировку страницы
  }
}

function onMainPinPressEnter(evt) {
  if (evt.code === KeyCodes.enter) { // Если нажата клавиша Enter
    togglePage(); // Вызываем разблокировку страницы
  }
}

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
  var x = getRandomNumber(0, pinsContainerElement.clientWidth); // Случайная координата по горизонтали
  var y = getRandomNumber(MAP_Y_TOP_LIMIT, MAP_Y_BOTTOM_LIMIT); // Случайная координата по вертикали

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

  pinElement.style.left = object.location.x - PIN_WIDTH / 2 + 'px'; // Задаем координату по x
  pinElement.style.top = object.location.y - PIN_HEIGHT + 'px'; // Задаем координату по y

  pinAvatarElement.src = object.author.avatar; // Задаём аватарку
  pinAvatarElement.alt = object.offer.description; // Задаём альтернативный текст

  return pinElement; // Возвращаем объявление
}

// function createImagesElements(object, cardElement) {
//   var cardPhotosElement = cardElement.querySelector('.popup__photos');

//   cardPhotosElement.innerHTML = ''; // Очищаем контейнер фотографий

//   for (var photo = 0; photo < object.offer.photos.length; photo++) {
//     var photoElement = new Image(45, 40); // Создаём изображение

//     photoElement.classList.add('popup__photo'); // Добавляем класс
//     photoElement.alt = 'Фотография жилья'; // Добавляем альтернативный текст
//     photoElement.src = object.offer.photos[photo]; // Добавляем ссылку

//     cardPhotosElement.appendChild(photoElement); // Вставляем изображение
//   }

//   return cardPhotosElement;
// }

// function createFeaturesElements(object, cardElement) {
//   var cardFeaturesElement = cardElement.querySelector('.popup__features');

//   for (var feature = 0; feature < object.offer.features.length; feature++) {
//     var featureElement = document.createElement('li'); // Создаём елемент списка

//     featureElement.classList.add('popup__feature'); // Добавляем класс
//     featureElement.classList.add('popup__feature--' + object.offer.features[feature]); // Добавляем модификатор

//     cardFeaturesElement.appendChild(featureElement); // Вставляем элемент списка
//   }

//   return cardFeaturesElement;
// }

// function createCardElement(object) {
//   var template = document.querySelector('#card')
//   .content
//   .querySelector('.map__card');

//   var cardElement = template.cloneNode(true);
//   var cardTitleElement = cardElement.querySelector('.popup__title');
//   var cardAddressElement = cardElement.querySelector('.popup__text--address');
//   var cardPriceElement = cardElement.querySelector('.popup__text--price');
//   var cardTypeElement = cardElement.querySelector('.popup__type');
//   var cardCapacityElement = cardElement.querySelector('.popup__text--capacity');
//   var cardTimeElement = cardElement.querySelector('.popup__text--time');
//   var cardFeaturesElement = cardElement.querySelector('.popup__features');
//   var cardDescriptionElement = cardElement.querySelector('.popup__description');
//   var cardAvatarElement = cardElement.querySelector('.popup__avatar');

//   cardTitleElement.textContent = object.offer.title;
//   cardAddressElement.textContent = object.offer.address;
//   cardPriceElement.textContent = object.offer.price + '₽/ночь';
//   cardTypeElement.textContent = Data.TypesTranslate[object.offer.type];
//   cardCapacityElement.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
//   cardTimeElement.textContent = 'заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;
//   cardDescriptionElement.textContent = object.offer.description;
//   cardAvatarElement.src = object.author.avatar;

//   cardFeaturesElement.innerHTML = ''; // Очищаем контейнер преимуществ

//   createImagesElements(object, cardElement); // Заполняем контейнер фотографиями
//   createFeaturesElements(object, cardElement); // Заполняем контейнер преимуществами

//   return cardElement;
// }

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

function getPositionPin(element) {
  var positionX = element.offsetLeft + PIN_WIDTH / 2; // Отступ слева + половина ширины метки
  var positionY = element.offsetTop + PIN_HEIGHT; // Отступ всерху + высота метки

  if (mapElement.classList.contains('map--faded')) { // Если карта заблокирована
    positionY = element.offsetTop + PIN_WIDTH / 2; // Отступ сверху + половина высоты без иголки
  }

  return positionX + ', ' + positionY;
}

function toggleInputs(elementsArray) {
  for (var i = 0; i < elementsArray.length; i++) {
    if (elementsArray[i].getAttribute('disabled')) {
      elementsArray[i].removeAttribute('disabled'); // Разблокируем елемент
    } else {
      elementsArray[i].setAttribute('disabled', 'true'); // Заблокируем элемент
    }
  }
}

function togglePage(loadPage) {
  if (!loadPage) {
    mapElement.classList.toggle('map--faded'); // Разблокируем карту
    adFormElement.classList.toggle('ad-form--disabled'); // Разблокируем форму
  }

  toggleInputs(adFieldsetElements); // Заблокируем/разблокируем поля добавления объявления
  toggleInputs(adsFilterElements); // Заблокируем/разблокируем поля фильтров

  validationСapacities(); // Вызываем функцию валидации вместимости
  addressFieldElement.value = getPositionPin(mainPinElement); // Указываем текущее расположение метки в поле адреса

  if (mapElement.classList.contains('map--faded')) {
    mainPinElement.addEventListener('mousedown', onMainPinClick); // Вешаем обработчик клика на метку
    mainPinElement.addEventListener('keydown', onMainPinPressEnter); // Вешаем обработчик Enter на метку

  } else {
    mapElement.classList.remove('map--faded'); // Разблокируем карту
    adFormElement.classList.remove('ad-form--disabled'); // Разблокируем форму

    mainPinElement.removeEventListener('mousedown', onMainPinClick); // Удаляем обработчик клика на метку
    mainPinElement.removeEventListener('keydown', onMainPinPressEnter); // Удаляем обработчик Enter на метку

    mainPinElement.removeEventListener('mousedown', onMainPinClick); // Удаляем обработчик клика на метку
    mainPinElement.removeEventListener('keydown', onMainPinPressEnter); // Удаляем обработчик Enter на метку

    roomNumberElement.addEventListener('change', function () {
      validationСapacities(); // Вызываем функцию валидации вместимости
    });

    capacityElement.addEventListener('change', function () {
      validationСapacities(); // Вызываем функцию валидации вместимости
    });

    renderElements(pinsElements, pinsContainerElement); // Отрисовываем тетки
  }
}

function validationСapacities() {
  if (capacityElement.value > roomNumberElement.value && capacityElement.value !== '0' && roomNumberElement.value !== '100') {
    capacityElement.valid = false; // Указываем что вместимость не валидна
    capacityElement.setCustomValidity('В такое маленькое жильё не поместится столько гостей');

  } else if (capacityElement.value === '0' & roomNumberElement.value !== '100') {
    capacityElement.valid = false; // Указываем что вместимость не валидна
    capacityElement.setCustomValidity('Если тебе нужно особняк для вечеринки - выбери 100 комнат!');

  } else if (capacityElement.value !== '0' & roomNumberElement.value === '100') {
    capacityElement.valid = false; // Указываем что вместимость не валидна
    capacityElement.setCustomValidity('Зачем тебе такой большой особняк для ' + capacityElement.value + 'человек!? Обычно его берут для вечеринок');

  } else {
    capacityElement.valid = true; // Указываем что вместимость валидна
    capacityElement.setCustomValidity('');
  }
}

var ads = getAds(NUMBER_ADS); // Создаём массив объявлений
var pinsElements = ads.map(createPinElement); // Формируем массив элементов меток

togglePage(true); // Блокируем нашу страницу

// var cardsElements = ads.map(createCardElement); // Создаем массив из карточек
// renderElements(cardsElements[INDEX_NECESSARY_CARD], map.element, map.filtersContainerElement); // Отрисовываем карточку первого объявления перед фильтрами
