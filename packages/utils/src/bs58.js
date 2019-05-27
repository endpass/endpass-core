import bs58check from 'bs58check';

export default {
  /**
   * Encode a buffer to Base58Check
   * If already a string, silently return it
   *
   * @param key
   * @returns {string}
   */
  encodeBase58(key) {
    if (typeof key === 'string') {
      return key;
    }
    return bs58check.encode(key);
  },

  /**
   * Decode from Base58Check string
   * If not a string, silently return it
   *
   * @param key
   * @returns {undefined|*}
   */
  decodeBase58(key) {
    if (typeof key !== 'string') {
      return key;
    }

    return bs58check.decode(key);
  },
};
