/**
 * @param {object|string|number} item
 * @param {string|number} value
 * @returns {object|Array<any>|string|number}
 */
const getOptionParameter = (item, value) => {
  if (item instanceof Object) return item[value];

  return item;
};

module.exports = getOptionParameter;
