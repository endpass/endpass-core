const secp256k1 = require('secp256k1');
const keystoreCrypto = require('./keystoreCrypto');

/**
 * Generate public key
 * @param {string} password
 * @param {V3Keystore} v3Keystore
 * @returns {string}
 */
const getPublicKey = (password, v3Keystore) => {
  const privateKey = this.getPrivateKey(password, v3Keystore);

  return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};

/**
 * Generate private key
 * @param {string} password
 * @param {V3Keystore} v3Keystore
 * @returns {string}
 */
const getPrivateKey = (password, v3Keystore) =>
  keystoreCrypto.decrypt(password, v3Keystore);

module.exports = {
  getPublicKey,
  getPrivateKey,
};
