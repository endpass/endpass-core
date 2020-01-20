// @ts-check

/**
 * @param {Array<object>} arr
 * @param {string|number} prop
 * @returns {Array<string|number>}
 */
const mapArrayByProp = (arr, prop) =>
  arr.reduce((acc, item) => {
    const target = item[prop];

    if (target) {
      // eslint-disable-next-line no-param-reassign
      acc[target] = item;
      return acc;
    }

    return acc;
  }, {});

module.exports = {
  mapArrayByProp,
};
