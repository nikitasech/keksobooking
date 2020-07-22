'use strict';

(function () {
  var MAX_NUMBER_ADS = window.service.MAX_NUMBER_ADS;
  var adsFilterElements = window.service.elements.adsFilterElements;
  var filtersContainerElement = window.service.elements.filtersContainerElement;

  var housingTypeElement = filtersContainerElement.querySelector('#housing-type');

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

  function filterToggle() {
    window.Util.toggleInputs(adsFilterElements); // Разблокируем поля фильтров
  }

  function renderFilterAds(data) {
    var filterData = filterType(data);

    window.map.renderPins(filterData.slice(0, MAX_NUMBER_ADS));
  }

  window.filter = {
    toggle: filterToggle,
    render: renderFilterAds
  };
})();
