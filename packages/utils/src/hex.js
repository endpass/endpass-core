/**
 * @param {string} hex
 * @returns {string}
 */
const stripHexPrefix = hex => hex.replace(/^0x/, '');

module.exports = {
  stripHexPrefix,
};
