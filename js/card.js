'use strict';

(function () {
  function createImagesElements(object, cardElement) {
    var cardPhotosElement = cardElement.querySelector('.popup__photos');

    cardPhotosElement.innerHTML = ''; // Очищаем контейнер фотографий

    for (var photo = 0; photo < object.offer.photos.length; photo++) {
      var photoElement = new Image(45, 40); // Создаём изображение

      photoElement.classList.add('popup__photo'); // Добавляем класс
      photoElement.alt = 'Фотография жилья'; // Добавляем альтернативный текст
      photoElement.src = object.offer.photos[photo]; // Добавляем ссылку

      cardPhotosElement.appendChild(photoElement); // Вставляем изображение
    }

    return cardPhotosElement;
  }

  function createFeaturesElements(object, cardElement) {
    var cardFeaturesElement = cardElement.querySelector('.popup__features');

    object.offer.features.forEach(function (item) {
      var featureElement = document.createElement('li'); // Создаём елемент списка

      featureElement.classList.add('popup__feature'); // Добавляем класс
      featureElement.classList.add('popup__feature--' + item); // Добавляем модификатор

      cardFeaturesElement.appendChild(featureElement); // Вставляем элемент списка
    });

    return cardFeaturesElement;
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
    var cardFeaturesElement = cardElement.querySelector('.popup__features');
    var cardDescriptionElement = cardElement.querySelector('.popup__description');
    var cardAvatarElement = cardElement.querySelector('.popup__avatar');

    cardTitleElement.textContent = object.offer.title;
    cardAddressElement.textContent = object.offer.address;
    cardPriceElement.textContent = object.offer.price + '₽/ночь';
    cardTypeElement.textContent = window.service.Data.TypesTranslate[object.offer.type];
    cardCapacityElement.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    cardTimeElement.textContent = 'заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;
    cardDescriptionElement.textContent = object.offer.description;
    cardAvatarElement.src = object.author.avatar;

    cardFeaturesElement.innerHTML = ''; // Очищаем контейнер преимуществ

    createImagesElements(object, cardElement); // Заполняем контейнер фотографиями
    createFeaturesElements(object, cardElement); // Заполняем контейнер преимуществами

    return cardElement;
  }

  window.cardsElements = window.ads.map(createCardElement); // Создаем массив из карточек
})();

