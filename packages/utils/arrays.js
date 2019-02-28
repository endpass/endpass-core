'use strict';

module.exports.uniq = function (arr) {
  return arr.reduce(function (acc, item) {
    return acc.includes(item) ? acc : acc.concat(item);
  }, []);
};

module.exports.mapArrayByProp = function (arr, prop) {
  return arr.reduce(function (acc, item) {
    var target = item[prop];

    if (target) {
      // eslint-disable-next-line no-param-reassign
      acc[target] = item;
      return acc;
    }

    return acc;
  }, {});
};
