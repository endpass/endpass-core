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
   * @param v3Keystore
   * @returns {string}
   */
  getPrivateKey(password, v3Keystore) {
    return keystoreCrypto.decrypt(password, v3Keystore);
  },
};
