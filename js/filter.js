'use strict';

(function () {
  var adsFilterElements = window.service.elements.adsFilterElements;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  var housingTypeElement = filtersContainerElement.querySelector('#housing-type');
  var priceElement = filtersContainerElement.querySelector('#housing-price');
  var roomsElement = filtersContainerElement.querySelector('#housing-rooms');
  var guestsElement = filtersContainerElement.querySelector('#housing-guests');
  var featuresElement = filtersContainerElement.querySelector('#housing-features');

  var Price = {
    LOW_MAX: 10000,
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    HIGH_MIN: 50000
  };

  function getCheckedFeatures() {
    var featuresElements = featuresElement.querySelectorAll('[name=features]');
    var checkedFeatures = [];

    featuresElements.forEach(function (element) {
      if (element.checked) {
        checkedFeatures.push(element.value);
      }
    });
    return checkedFeatures;
  }

  function filterToggle() {
    window.Util.toggleInputs(adsFilterElements); // Разблокируем поля фильтров
  }

  function checkAny(element) {
    return element.value !== 'any';
  }

  function filterAds(data) {
    var checkedFeatures = getCheckedFeatures();

    return data.filter(function (ad) {
      var isCoincidenceType = true;
      var isCoincidencePrice = true;
      var isCoincidenceRooms = true;
      var isCoincidenceGuests = true;
      var isCoincidenceFeatures = true;
      var isExistOffer = Boolean(ad.offer);

      if (checkAny(housingTypeElement)) {
        isCoincidenceType = ad.offer.type === housingTypeElement.value;
      }

      if (checkAny(priceElement)) {
        if (priceElement.value === 'low') {
          isCoincidencePrice = ad.offer.price < Price.LOW_MAX;
        } else if (priceElement.value === 'middle') {
          isCoincidencePrice = ad.offer.price >= Price.MIDDLE_MIN && ad.offer.price < Price.MIDDLE_MAX;
        } else {
          isCoincidencePrice = ad.offer.price >= Price.HIGH_MIN;
        }
      }

      if (checkAny(roomsElement)) {
        isCoincidenceRooms = +ad.offer.rooms === +roomsElement.value;
      }

      if (checkAny(guestsElement)) {
        isCoincidenceGuests = +ad.offer.guests === +guestsElement.value;
      }

      if (checkedFeatures.length) {
        isCoincidenceFeatures = checkedFeatures.every(function (feature) {
          return ad.offer.features.includes(feature);
        });
      }

      return isCoincidenceType
        && isCoincidencePrice
        && isCoincidenceRooms
        && isCoincidenceGuests
        && isCoincidenceFeatures
        && isExistOffer;
    });
  }

  window.filter = {
    toggle: filterToggle,
    adsFilter: filterAds
  };
})();
