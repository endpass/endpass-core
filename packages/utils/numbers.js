'use strict';

module.exports.isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
