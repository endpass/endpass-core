import keystoreWallet from './keystoreWallet';
import keystoreHDWallet from './keystoreHDWallet';
import keystoreKeyGen from './keystoreKeyGen';
import crypto from './crypto';
import bipSeed from './bipSeed';

const walletGen = {
  /**
   * Create new wallet
   *
   * @param password
   * @param encryptOptions
   * @return {Promise<{v3KeystoreHdWallet: v3Keystore, encryptedSeed, v3KeystoreChildWallet: v3Keystore, seedKey: string}>}
   */
  async createComplex(password, encryptOptions) {
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
  },

  /**
   * Create HD wallet and child wallet v3Keystore
   * @param seedKey
   * @param password
   * @param encryptOptions
   * @return {{v3KeystoreHdWallet: v3Keystore, v3KeystoreChildWallet: v3Keystore}}
   */
  createHDWithChild(seedKey, password, encryptOptions) {
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
  },
};

module.exports = walletGen;
