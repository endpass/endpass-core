const HDKey = require('ethereumjs-wallet/hdkey');
const bipSeed = require('./bipSeed');
const keystoreCrypto = require('./keystoreCrypto');
const { HD_KEY_MNEMONIC_PATH } = require('./constants');
const bs58 = require('./bs58');

/**
 * Create HD Wallet by seed
 * @param {string} seedPhrase
 * @returns {EthereumHDKey}
 */
const createHDWalletBySeed = seedPhrase => {
  const seed = bipSeed.mnemonicToSeedSync(seedPhrase);
  const hdKey = HDKey.fromMasterSeed(seed);

  return hdKey.derivePath(HD_KEY_MNEMONIC_PATH);
};

/**
 * Encrypts an ethereumjs Wallet
 * @param {string} password
 * @param {EthereumHDKey} wallet
 * @param {KDFEncryptOptions} [encryptOptions]
 * @returns {*}
 */
const encryptHDWallet = (password, wallet, encryptOptions) => {
  const xPrv = bs58.decodeBase58(wallet.privateExtendedKey());
  const json = keystoreCrypto.encrypt(password, xPrv, encryptOptions);

  json.address = wallet.publicExtendedKey();

  return json;
};

/**
 * Decrypts a keystore into an ethereumjs Wallet
 * @param {string} password
 * @param {V3Keystore} v3Keystore
 * @returns {EthereumHDKey}
 */
const decryptHDWallet = (password, v3Keystore) => {
  const xPrv = keystoreCrypto.decrypt(password, v3Keystore);
  const xPrvString = bs58.encodeBase58(xPrv);

  return HDKey.fromExtendedKey(xPrvString);
};

module.exports = {
  createHDWalletBySeed,
  encryptHDWallet,
  decryptHDWallet,
};
