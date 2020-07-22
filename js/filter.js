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

  function filterType(data) {
    var filterData;

    /* Если выбираем "любой тип жилья" - в переменную отфильтрованных
    объявлений записываеются все объявления. Иначе фильтруются по типу */
    if (housingTypeElement.value === 'any') {
      filterData = data;
    } else {
      filterData = data
        .filter(function (ad) {
          return ad.offer.type === housingTypeElement.value;
        });
    }
    return filterData;
  }

  function filterPrice(data) {
    var filterData;

    if (priceElement.value === 'any') {
      filterData = data;
    } else {
      filterData = data
        .filter(function (ad) {
          if (priceElement.value === 'low') {
            return ad.offer.price < Price.LOW_MAX;
          } else if (priceElement.value === 'middle') {
            return ad.offer.price >= Price.MIDDLE_MIN && ad.offer.price < Price.MIDDLE_MAX;
          }
          return ad.offer.price >= Price.HIGH_MIN;
        });
    }
    return filterData;
  }

  function filterRooms(data) {
    var filterData;

    if (roomsElement.value === 'any') {
      filterData = data;
    } else {
      filterData = data
        .filter(function (ad) {
          return +ad.offer.rooms === +roomsElement.value;
        });
    }
    return filterData;
  }

  function filterGuests(data) {
    var filterData;

    if (guestsElement.value === 'any') {
      filterData = data;
    } else {
      filterData = data
        .filter(function (ad) {
          return +ad.offer.guests === +guestsElement.value;
        });
    }
    return filterData;
  }

  function filterFeatures(data) {
    var filterData;
    var checkedFeatures = getCheckedFeatures();

    if (checkedFeatures.length === 0) {
      filterData = data;
    } else {
      filterData = data
        .filter(function (ad) {
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

  function filterToggle() {
    window.Util.toggleInputs(adsFilterElements); // Разблокируем поля фильтров
  }

  function renderFilterAds(data) {
    var filterData = filterType(data);
    filterData = filterPrice(filterData);
    filterData = filterRooms(filterData);
    filterData = filterGuests(filterData);
    filterData = filterFeatures(filterData);

    getCheckedFeatures();


    window.map.renderPins(filterData.slice(0, MAX_NUMBER_ADS));
  }

  window.filter = {
    toggle: filterToggle,
    render: renderFilterAds
  };
})();
