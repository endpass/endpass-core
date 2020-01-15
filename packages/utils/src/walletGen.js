const keystoreWallet = require('./keystoreWallet');
const keystoreHDWallet = require('./keystoreHDWallet');
const keystoreKeyGen = require('./keystoreKeyGen');
const crypto = require('./crypto');
const bipSeed = require('./bipSeed');

/**
 * Create new wallet
 * @param {string} password
 * @param {KDFEncryptOptions} encryptOptions
 * @return {Promise<{v3KeystoreHdWallet: v3Keystore, encryptedSeed: string, v3KeystoreChildWallet: v3Keystore, seedKey: string}>}
 */
const createComplex = async (password, encryptOptions) => {
  // create hd wallet
  const seedKey = bipSeed.generateSeedKey();

  const {
    v3KeystoreHdWallet,
    v3KeystoreChildWallet,
  } = walletGen.createHDWithChild(seedKey, password, encryptOptions);

  // create seed
  const publicKey = keystoreKeyGen.getPublicKey(
    password,
    v3KeystoreChildWallet,
  );
  const encryptedSeed = await crypto.encrypt(seedKey, publicKey);

  return {
    seedKey,
    encryptedSeed,
    v3KeystoreHdWallet,
    v3KeystoreChildWallet,
  };
};

/**
 * Create HD wallet and child wallet v3Keystore
 * @param {string} seedKey
 * @param {string} password
 * @param {KDFEncryptOptions} encryptOptions
 * @return {{v3KeystoreHdWallet: v3Keystore, v3KeystoreChildWallet: v3Keystore}}
 */
const createHDWithChild = (seedKey, password, encryptOptions) => {
  const hdWallet = keystoreHDWallet.createHDWalletBySeed(seedKey);

  const v3KeystoreHdWallet = keystoreHDWallet.encryptHDWallet(
    password,
    hdWallet,
    encryptOptions,
  );

  // create first child
  const childWallet = keystoreWallet.createWalletByIndex(
    password,
    v3KeystoreHdWallet,
    0,
    encryptOptions,
  );

  const v3KeystoreChildWallet = keystoreWallet.encryptWallet(
    password,
    childWallet,
    encryptOptions,
  );

  return {
    v3KeystoreHdWallet,
    v3KeystoreChildWallet,
  };
};

module.exports = {
  createComplex,
  createHDWithChild,
};
