/**
 * Verify public key
 * @param {string} value
 * @returns {boolean}
 */
const verifySeed = value => value.trim().split(/\s+/g).length >= 12;

module.exports = {
  verifySeed,
};
