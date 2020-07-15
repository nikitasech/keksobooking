'use strict';

(function () {
  var TIMEOUT = 2000;

  var StatusCodes = {
    OK: 200,
  };

  var ResponseTypes = {
    JSON: 'json',
  };

  window.backend = {
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = ResponseTypes.JSON;

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCodes.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения. Попробуйте перезагрузить страницу');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    },

    save: function (url, data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = ResponseTypes.JSON;

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCodes.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
