'use strict';

module.exports.stripHexPrefix = function (hex) {
  return hex.replace(/^0x/, '');
};
