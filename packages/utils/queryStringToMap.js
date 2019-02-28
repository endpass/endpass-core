'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function queryStringToMap () {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var lines = path.split('&');
  var query = lines.reduce(function (map, line) {
    var values = line.split('=');
    var key = values[0];

    if (key) {
      // eslint-disable-next-line
      map[key] = values[1];
    }

    return map;
  }, {});
  return query;
}

exports.default = queryStringToMap;
