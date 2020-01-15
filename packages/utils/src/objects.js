const get = require('lodash/get');

/**
 * @param {object|Array<object>} obj
 * @returns {object}
 */
const merge = (...obj) =>
  obj.reduce((acc, item) => Object.assign(acc, item), {});

/**
 * @param {object} target
 * @param {Array<string>} paths
 * @returns {any|undefined}
 */
const getFrom = (target, ...paths) => {
  const existPath = paths.find(path => get(target, path));

  if (!existPath) {
    return null;
  }

  return get(target, existPath);
};

/**
 * @param {object} obj
 * @param {string} [prefix]
 * @returns {Array}
 */
const parseObjectProperties = (obj, prefix) =>
  Object.keys(obj)
    .filter(key => (prefix ? key.indexOf(prefix) === 0 : true))
    .reduce((parsedObj, key) => {
      try {
        parsedObj[key] = JSON.parse(obj[key]);
      } catch (e) {
        parsedObj[key] = obj[key];
      }
      return parsedObj;
    }, {});

module.exports = {
  merge,
  getFrom,
  parseObjectProperties,
};
