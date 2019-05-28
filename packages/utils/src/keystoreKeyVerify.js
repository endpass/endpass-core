import secp256k1 from 'secp256k1';

export default {
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
