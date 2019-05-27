import keythereum from 'keythereum';
import { KDF_ENCRYPT_OPTIONS } from './constants';
import isV3 from './isV3';

// Monkey patch keythereum to skip generating address for private keys
// This allows us to encrypt private keys of arbitrary length, and
// conforms better to the Ethereum keystore V3 spec, which does not include
// the address for privacy reasons.
// See https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition#alterations-from-version-1
// eslint-disable-next-line
keythereum.privateKeyToAddress = function(pk) {
  return '';
};

export default {
  /**
   * Encrypts a private key Buffer into a V3 keystore object
   * The exported keystore does NOT include an address
   *
   * @param password Password
   * @param privateKey Private key
   * @param [options] KDF encrypt options
   * @returns {object} v3Keystore
   */
  encrypt(password, privateKey, options = KDF_ENCRYPT_OPTIONS) {
    const dk = keythereum.create();

    const dumpOptions = {
      kdf: options.kdf,
      kdfparams: {
        kdf: options.kdf,
        n: options.n,
      },
    };

    const encrypted = keythereum.dump(
      password,
      privateKey,
      dk.salt,
      dk.iv,
      dumpOptions,
    );

    delete encrypted.address;

    return encrypted;
  },

  /**
   * Decrypts a V3 keystore object into a private key Buffer
   *
   * @param password
   * @param {object} v3Keystore keystore
   * @returns {*|buffer}
   */
  decrypt(password, v3Keystore) {
    if (!password) {
      throw new Error('Password is empty');
    }

    if (!isV3(v3Keystore)) {
      throw new Error('Wallet is not in keystore V3 format!');
    }

    return keythereum.recover(password, v3Keystore);
  },
};
