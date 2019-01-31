'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var get = _interopDefault(require('lodash/get'));

module.exports = {
  merge: function merge() {
    for (var _len = arguments.length, obj = new Array(_len), _key = 0; _key < _len; _key++) {
      obj[_key] = arguments[_key];
    }

    return obj.reduce(function (acc, item) {
      return Object.assign(acc, item);
    }, {});
  },
  getFrom: function getFrom(target) {
    for (var _len2 = arguments.length, paths = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      paths[_key2 - 1] = arguments[_key2];
    }

    var existPath = paths.find(function (path) {
      return get(target, path);
    });

    if (!existPath) {
      return null;
    }

    return get(target, existPath);
  }
};
