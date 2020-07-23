'use strict';

(function () {
  var TIMEOUT = 2000;

  var StatusCode = {
    OK: 200,
  };

  var ResponseType = {
    JSON: 'json',
  };

  function askResponse(typeRequest, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = ResponseType.JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      if (typeRequest === 'POST') {
        onError('Произошла ошибка соединения');
      } else {
        onError('Произошла ошибка соединения. Попробуйте перезагрузить страницу');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(typeRequest, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  window.backend = {
    askResponce: askResponse
  };
})();
