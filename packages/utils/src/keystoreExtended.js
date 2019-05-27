import isV3 from './isV3';
import bs58 from './bs58';

export default {
  /**
   * Returns true if the key is an extended public key (xpub)
   * Accepts string or buffer
   *
   * @param key
   * @returns {boolean}
   */
  isExtendedPublicKey(key) {
    const keyString = bs58.encodeBase58(key);
    return keyString.indexOf('xpub') === 0;
  },

  /**
   * Returns true if the key is an extended private key (xprv)
   * Accepts string or buffer
   *
   * @param key
   * @returns {boolean}
   */
  isExtendedPrivateKey(key) {
    const keyString = bs58.encodeBase58(key);
    return keyString.indexOf('xprv') === 0;
  },

  // Simple sanity check to ensure a valid V3 keystore
  isV3,
};
