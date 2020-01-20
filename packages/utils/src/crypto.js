// @ts-check
const ecies = require('eth-ecies');

/**
 * Encrypt data by public key
 * @param {string|ArrayBuffer|SharedArrayBuffer} data
 * @param {string|Buffer} publicKey
 * @returns {string}
 */
const encrypt = (data, publicKey) => {
  const dataBuffer =
    typeof data === 'string' ? Buffer.from(data, 'utf8') : Buffer.from(data);

  return ecies.encrypt(publicKey, dataBuffer).toString('hex');
};

/**
 * Decrypt data by private key
 * @param {string|ArrayBuffer|SharedArrayBuffer} data
 * @param {string|Buffer} privateKey
 * @returns {string}
 */
const decrypt = (data, privateKey) => {
  const dataBuffer =
    typeof data === 'string' ? Buffer.from(data, 'hex') : Buffer.from(data);

  return ecies.decrypt(privateKey, dataBuffer).toString('utf8');
};

module.exports = {
  encrypt,
  decrypt,
};
