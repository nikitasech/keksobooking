'use strict';

(function () {
  var MAX_NUMBER_ADS = window.service.MAX_NUMBER_ADS;
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

  function checkNeedFilter(data, element, callback) {
    var filterData;

    /* Если выбираем пункт не требующий фильтрации - в переменную отфильтрованных
    объявлений записываеются все объявления. Иначе фильтруются по типу */
    if (element.value === 'any' || !element.length) {
      filterData = data;
    } else {
      filterData = callback(data);
    }
    return filterData;
  }

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

  function filterType(data) {
    return data.filter(function (ad) {
      return ad.offer.type === housingTypeElement.value;
    });
  }

  function filterPrice(data) {
    return data.filter(function (ad) {
      if (priceElement.value === 'low') {
        return ad.offer.price < Price.LOW_MAX;
      } else if (priceElement.value === 'middle') {
        return ad.offer.price >= Price.MIDDLE_MIN && ad.offer.price < Price.MIDDLE_MAX;
      }
      return ad.offer.price >= Price.HIGH_MIN;
    });
  }

  function filterRooms(data) {
    return data.filter(function (ad) {
      return +ad.offer.rooms === +roomsElement.value;
    });
  }

  function filterGuests(data) {
    return data.filter(function (ad) {
      return +ad.offer.guests === +guestsElement.value;
    });
  }

  function filterFeatures(data) {
    return data.filter(function (ad) {
      var checkedFeatures = getCheckedFeatures();
      var isCoincidence;

      for (var i = 0; i < checkedFeatures.length; i++) {
        for (var j = 0; j < ad.offer.features.length; j++) {
          if (checkedFeatures[i] === ad.offer.features[j]) {
            isCoincidence = true;
            break;
          } else {
            isCoincidence = false;
          }
        }
        if (!isCoincidence) {
          return false;
        }
      }
      return true;
    });
  }

  function filterToggle() {
    window.Util.toggleInputs(adsFilterElements); // Разблокируем поля фильтров
  }

  var renderFilterAds = window.debounce(function (data) {
    var checkedFeatures = getCheckedFeatures();

    var filterData = checkNeedFilter(data, housingTypeElement, filterType)
    .checkNeedFilter(filterData, priceElement, filterPrice)
    .checkNeedFilter(filterData, roomsElement, filterRooms)
    .checkNeedFilter(filterData, guestsElement, filterGuests)
    .checkNeedFilter(filterData, checkedFeatures, filterFeatures);

    window.map.renderPins(filterData.slice(0, MAX_NUMBER_ADS));
  });

  window.filter = {
    toggle: filterToggle,
    render: renderFilterAds
  };
})();
