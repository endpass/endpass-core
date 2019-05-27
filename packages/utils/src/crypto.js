import { encrypt, decrypt } from 'eth-ecies';

export default {
  /**
   * Encrypt data by public key
   * @param data
   * @param publicKey
   * @returns {string}
   */
  encrypt(data, publicKey) {
    return encrypt(publicKey, Buffer.from(data, 'utf8')).toString('hex');
  },

  /**
   * Decrypt data by private key
   * @param data
   * @param privateKey
   * @returns {string}
   */
  decrypt(data, privateKey) {
    return decrypt(privateKey, Buffer.from(data, 'hex')).toString('utf8');
  },
};
