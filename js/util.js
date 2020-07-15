'use strict';

(function () {
  window.Util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArray: function (array) {
      var newArray = array.slice(0);

      for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // Выбираем случайное число (0 ≤ j ≤ i)
        var swap = newArray[j]; // Записываем содержимое массива под индексом j в переменную
        newArray[j] = newArray[i]; // Под индексом j записываем значение индекса i
        newArray[i] = swap; // А под индексом i записываем сохранённое значение индекса j
      }

      var randomNumber = this.getRandomNumber(0, newArray.length); // Берём случайное число
      newArray = newArray.slice(randomNumber); // Убираем из массива случайное кол-во элементов

      return newArray;
    },

    renderElements: function (elements, container, insertBefore) {
      var fragment = document.createDocumentFragment(); // Создаём фрагмент

      if (Array.isArray(elements)) {
        elements.forEach(function (item) {
          fragment.appendChild(item); // Вставляем во фрагмент элементы из массива
        });
      } else {
        fragment.appendChild(elements); // Вставляем во фрагмент элемент
      }

      if (insertBefore) {
        container.insertBefore(fragment, insertBefore);
      } else {
        container.appendChild(fragment); // Вставляем фрагмент в разметку
      }
    },

    toggleInputs: function (elementsArray) {
      elementsArray.forEach(function (item) {
        item.disabled = !item.disabled; // Разблокируем елемент
      });
    }
  };
})();
