// @ts-check

/**
 * @param {number|string} num
 * @returns {boolean}
 */
const isNumeric = num => {
  const value = typeof num !== 'number' ? parseFloat(num) : num;

  // eslint-disable-next-line
  return !isNaN(value) && isFinite(value);
};

/**
 * @param {any} num
 * @returns {string}
 */
const toFixed = num => (!num ? '0' : (num / 100).toFixed(2));

module.exports = {
  isNumeric,
  toFixed,
};
