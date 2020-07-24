'use strict';

(function () {
  var workerTypeToType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  function createImagesElements(photos, photosElement) {
    photosElement.innerHTML = ''; // Очищаем контейнер фотографий

    photos.forEach(function (urlPhoto) {
      var photoElement = new Image(45, 40); // Создаём изображение

      photoElement.classList.add('popup__photo'); // Добавляем класс
      photoElement.alt = 'Фотография жилья'; // Добавляем альтернативный текст
      photoElement.src = urlPhoto; // Добавляем ссылку

      photosElement.appendChild(photoElement); // Вставляем изображение
    });

    return photosElement;
  }

  function createFeaturesElements(features, featuresElement) {
    features.forEach(function (item) {
      featuresElement.innerHTML = ''; // Очищаем контейнер преимуществ

      var featureElement = document.createElement('li'); // Создаём елемент списка

      featureElement.classList.add('popup__feature'); // Добавляем класс
      featureElement.classList.add('popup__feature--' + item); // Добавляем модификатор

      featuresElement.appendChild(featureElement); // Вставляем элемент списка
    });

    return featuresElement;
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
    var cardDescriptionElement = cardElement.querySelector('.popup__description');
    var cardAvatarElement = cardElement.querySelector('.popup__avatar');
    var photosElement = cardElement.querySelector('.popup__photos');
    var featuresElement = cardElement.querySelector('.popup__features');

    function fillElement(data, element, property) {
      if (property) {
        element[property] = data;
      } else {
        element.textContent = data;
      }
    }

    function fillCard(data, element, callback, property) {
      if (data && data.length) {
        callback(data, element, property);
      } else {
        element.remove();
      }
    }

    fillCard(object.offer.title, cardTitleElement, fillElement);
    fillCard(object.offer.address, cardAddressElement, fillElement);
    fillCard(object.offer.price, cardPriceElement, fillElement);
    fillCard(workerTypeToType[object.offer.type], cardTypeElement, fillElement);
    fillCard(object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей', cardCapacityElement, fillElement);
    fillCard('заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout, cardTimeElement, fillElement);
    fillCard(object.offer.description, cardDescriptionElement, fillElement);
    fillCard(object.author.avatar, cardAvatarElement, fillElement, 'src');
    fillCard(object.offer.photos, photosElement, createImagesElements);
    fillCard(object.offer.features, featuresElement, createFeaturesElements);

    return cardElement;
  }

  window.card = {
    createElement: createCardElement,
  };
})();
