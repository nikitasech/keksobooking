'use strict';

(function () {
  var mapElement = window.service.elements.mapElement;
  var mainPinElement = window.service.elements.mainPinElement;

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onPinMove(evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: evtMove.clientX - coordinates.x,
        y: evtMove.clientY - coordinates.y,
      };

      coordinates = {
        x: evtMove.clientX,
        y: evtMove.clientY,
      };

      mainPinElement.style.top = `${mainPinElement.offsetTop + shift.y}px`;
      mainPinElement.style.left = `${mainPinElement.offsetLeft + shift.x}px`;

      document.addEventListener('mouseup', onPinUp);
    }

    function onPinUp() {
      mapElement.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);

      return console.log('приуэт');
    }

    mapElement.addEventListener('mousemove', onPinMove);
  });
})();
