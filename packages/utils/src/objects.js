// @ts-check
const get = require('lodash/get');

/**
 * @param {object|Array<object>} obj
 * @returns {object}
 */
const merge = (...obj) =>
  // @ts-ignore
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
 * @param {{ [x: string]: any }} obj
 * @param {string} [prefix]
 * @returns {object}
 */
const parseObjectProperties = (obj, prefix) => {
  /** @type {{ [x: string]: any }} */
  const initialAcc = {};

  return Object.keys(obj)
    .filter(key => (prefix ? key.indexOf(prefix) === 0 : true))
    .reduce((acc, key) => {
      try {
        return Object.assign(acc, {
          [key]: JSON.parse(obj[key]),
        });
      } catch (e) {
        return Object.assign(acc, {
          [key]: obj[key],
        });
      }
    }, initialAcc);
};

module.exports = {
  merge,
  getFrom,
  parseObjectProperties,
};
