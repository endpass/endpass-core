// @ts-check
const keystoreWallet = require('./keystoreWallet');
const keystoreHDWallet = require('./keystoreHDWallet');
const keystoreKeyGen = require('./keystoreKeyGen');
const crypto = require('./crypto');
const bipSeed = require('./bipSeed');

/**
 * Create HD wallet and child wallet v3Keystore
 * @param {string} seedKey
 * @param {string} password
 * @param {KDFEncryptOptions} encryptOptions
 * @return {{v3KeystoreHdWallet: V3Keystore, v3KeystoreChildWallet: V3Keystore}}
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

/**
 * Create new wallet
 * @param {string} password
 * @param {KDFEncryptOptions} encryptOptions
 * @return {{v3KeystoreHdWallet: V3Keystore, encryptedSeed: string, v3KeystoreChildWallet: V3Keystore, seedKey: string}}
 */
const createComplex = (password, encryptOptions) => {
  // create hd wallet
  const seedKey = bipSeed.generateSeedKey();
  const { v3KeystoreHdWallet, v3KeystoreChildWallet } = createHDWithChild(
    seedKey,
    password,
    encryptOptions,
  );
  // create seed
  const publicKey = keystoreKeyGen.getPublicKey(
    password,
    v3KeystoreChildWallet,
  );
  const encryptedSeed = crypto.encrypt(seedKey, publicKey);

  return {
    seedKey,
    encryptedSeed,
    v3KeystoreHdWallet,
    v3KeystoreChildWallet,
  };
};

module.exports = {
  createComplex,
  createHDWithChild,
};
