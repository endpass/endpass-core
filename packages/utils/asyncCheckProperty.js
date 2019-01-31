'use strict';

var get = require('lodash/get');

var identity = require('lodash/identity');

module.exports = function (object, path) {
  var predicate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  var timer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 250;
  return new Promise(function (resolve) {
    /* eslint-disable-next-line */
    var interval = setInterval(function () {
      var value = get(object, path);

      if (predicate(value)) {
        clearInterval(interval);
        return resolve(value);
      }
    }, timer);
  });
};
