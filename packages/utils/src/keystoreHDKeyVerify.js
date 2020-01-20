// @ts-check
const bs58 = require('./bs58');

/**
 * Returns true if the key is an extended public key (xpub)
 * Accepts string or buffer
 * @param {string} key
 * @returns {boolean}
 */
const isExtendedPublicKey = key => {
  const keyString = bs58.encodeBase58(key);
  return keyString.indexOf('xpub') === 0;
};

/**
 * Returns true if the key is an extended private key (xprv)
 * Accepts string or buffer
 * @param {string} key
 * @returns {boolean}
 */
const isExtendedPrivateKey = key => {
  const keyString = bs58.encodeBase58(key);
  return keyString.indexOf('xprv') === 0;
};

module.exports = {
  isExtendedPublicKey,
  isExtendedPrivateKey,
};
