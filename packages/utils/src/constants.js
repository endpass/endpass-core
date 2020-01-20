// @ts-check

// Parameters for cipher encrypting wallet
/**
 * @type {KDFEncryptOptions}
 */
const KDF_ENCRYPT_OPTIONS = {
  kdf: 'scrypt',
  n: 8192,
};

const HD_KEY_MNEMONIC_PATH = "m/44'/60'/0'/0";

module.exports = {
  KDF_ENCRYPT_OPTIONS,
  HD_KEY_MNEMONIC_PATH,
};
