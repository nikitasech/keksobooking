'use strict';

(function () {
  function renderElements(elements, container, insertBefore) {
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
  }

  function toggleInputs(elementsArray) {
    elementsArray.forEach(function (item) {
      item.disabled = !item.disabled; // Разблокируем елемент
    });
  }

  window.Util = {
    renderElements: renderElements,
    toggleInputs: toggleInputs
  };
})();
