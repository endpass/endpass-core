const ecies = require('eth-ecies');

/**
 * Encrypt data by public key
 * @param {string|Buffer|ArrayBuffer|Array<number|string>,} data
 * @param {string} publicKey
 * @returns {string}
 */
const encrypt = (data, publicKey) =>
  ecies.encrypt(publicKey, Buffer.from(data, 'utf8')).toString('hex');

/**
 * Decrypt data by private key
 * @param {string|Buffer|ArrayBuffer|Array<number|string>} data
 * @param {string} privateKey
 * @returns {string}
 */
const decrypt = (data, privateKey) =>
  ecies.decrypt(privateKey, Buffer.from(data, 'hex')).toString('utf8');

module.exports = {
  encrypt,
  decrypt,
};
