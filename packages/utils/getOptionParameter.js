'use strict';

module.exports = function (item, value) {
  return item instanceof Object ? item[value] : item;
};
