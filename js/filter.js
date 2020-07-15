'use strict';

(function () {
  var adsFilterElements = window.service.elements.adsFilterElements;

  window.filter = {
    toggle: function () {
      window.Util.toggleInputs(adsFilterElements); // Разблокируем поля фильтров
    }
  };
})();
