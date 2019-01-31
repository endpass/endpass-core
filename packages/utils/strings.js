'use strict';

module.exports = {
  getShortStringWithEllipsis: function getShortStringWithEllipsis(string) {
    var symbolsCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    return "".concat(string.slice(0, symbolsCount), "...").concat(string.slice(-symbolsCount));
  },
  matchString: function matchString(a, b) {
    return new RegExp(b, 'i').test(a);
  }
};
