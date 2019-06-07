export default {
  /**
   * Verify public key
   *
   * @param value
   * @returns {boolean}
   */
  verifySeed(value) {
    return value.trim().split(/\s+/g).length >= 12;
  },
};
