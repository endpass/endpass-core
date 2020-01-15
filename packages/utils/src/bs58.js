const bs58check = require('bs58check');

/**
 * Encode a buffer to Base58Check
 * If already a string, silently return it
 * @param {string|Array<number>} key
 * @returns {string}
 */
const encodeBase58 = key => {
  if (typeof key === 'string') {
    return key;
  }
  return bs58check.encode(key);
};

/**
 * Decode from Base58Check string
 * If not a string, silently return it
 * @param {string|Array<number>} key
 * @returns {Array<number>}
 */
const decodeBase58 = key => {
  if (typeof key !== 'string') {
    return key;
  }

  return bs58check.decode(key);
};

module.exports = {
  encodeBase58,
  decodeBase58,
};
