'use strict';

// eslint-disable-next-line
module.exports.isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
