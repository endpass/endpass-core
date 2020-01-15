/**
 * @param {number|string} n
 * @returns string
 */
const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * @param {any} n
 * @returns boolean
 */
const toFixed = num => (!num ? '0' : (num / 100).toFixed(2));

module.exports = {
  isNumeric,
  toFixed,
};
