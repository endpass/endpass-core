const secp256k1 = require('secp256k1');

/**
 * Verify public key
 * @param {string} value
 * @returns {boolean}
 */
const verifyPublicKey = value =>
  secp256k1.publicKeyVerify(Buffer.from(value.replace(/^0x/, ''), 'hex'));

/**
 * Verify private key
 * @param {string} value
 * @returns {*}
 */
const verifyPrivateKey = value =>
  secp256k1.privateKeyVerify(Buffer.from(value.replace(/^0x/, ''), 'hex'));

module.exports = {
  verifyPublicKey,
  verifyPrivateKey,
};
