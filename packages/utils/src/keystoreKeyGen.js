import secp256k1 from 'secp256k1';
import keystoreCrypto from './keystoreCrypto';

export default {
  /**
   * Generate public key
   *
   * @param password
   * @param v3Keystore
   * @returns {string}
   */
  getPublicKey(password, v3Keystore) {
    const privateKey = this.getPrivateKey(password, v3Keystore);
    return secp256k1.publicKeyCreate(privateKey, false).slice(1);
  },

  /**
   * Generate private key
   *
   * @param password
   * @param v3Keystor1e
   * @returns {string}
   */
  getPrivateKey(password, v3Keystore) {
    return keystoreCrypto.decrypt(password, v3Keystore);
  },

  /**
   * Verify public key
   *
   * @param value
   * @returns {boolean}
   */
  verifyPublicKey(value) {
    return secp256k1.publicKeyVerify(
      Buffer.from(value.replace(/^0x/, ''), 'hex'),
    );
  },

  /**
   * Verify private key
   *
   * @param value
   * @returns {*}
   */
  verifyPrivateKey(value) {
    return secp256k1.privateKeyVerify(
      Buffer.from(value.replace(/^0x/, ''), 'hex'),
    );
  },
};
