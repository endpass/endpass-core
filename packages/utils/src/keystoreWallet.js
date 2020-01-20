const EthWallet = require('ethereumjs-wallet');
const keystoreCrypto = require('./keystoreCrypto');
const keystoreHDWallet = require('./keystoreHDWallet');

/**
 * Create Wallet = require(HD Wallet by index
 * @param {string} password
 * @param {V3Keystore} hdKeystore
 * @param {number} [index]
 * @return {object}
 */
const createWalletByIndex = (password, hdKeystore, index = 0) => {
  const hdWallet = keystoreHDWallet.decryptHDWallet(password, hdKeystore);
  return hdWallet.deriveChild(index).getWallet();
};

/**
 * Encrypts an ethereumjs Wallet
 * @param {string} password
 * @param {Wallet} wallet
 * @param {KDFEncryptOptions} encryptOptions
 * @return {object} v3Keystore
 */
const encryptWallet = (password, wallet, encryptOptions) => {
  const json = keystoreCrypto.encrypt(
    password,
    wallet.getPrivateKey(),
    encryptOptions,
  );

  return {
    ...json,
    address: wallet.getChecksumAddressString(),
  };
};

/**
 * Decrypts a keystore into an ethereumjs Wallet
 * @param {string} password
 * @param {V3Keystore} v3Keystore
 * @return {Wallet}
 */
const decryptWallet = (password, v3Keystore) => {
  const privateKey = keystoreCrypto.decrypt(password, v3Keystore);

  return EthWallet.fromPrivateKey(privateKey);
};

module.exports = {
  createWalletByIndex,
  encryptWallet,
  decryptWallet,
};
