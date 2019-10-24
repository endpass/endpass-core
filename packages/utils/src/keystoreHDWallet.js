import HDKey from 'ethereumjs-wallet/hdkey';
import bipSeed from './bipSeed';
import keystoreCrypto from './keystoreCrypto';

import { HD_KEY_MNEMONIC_PATH } from './constants';
import bs58 from './bs58';

const keystoreHDWallet = {
  /**
   * Create HD Wallet by seed
   *
   * @param seedPhrase
   * @returns {EthereumHDKey}
   */
  createHDWalletBySeed(seedPhrase) {
    const seed = bipSeed.mnemonicToSeedSync(seedPhrase);
    const hdKey = HDKey.fromMasterSeed(seed);

    return hdKey.derivePath(HD_KEY_MNEMONIC_PATH);
  },

  /**
   * Encrypts an ethereumjs Wallet
   *
   * @param {string} password
   * @param {EthereumHDKey} wallet
   * @param [encryptOptions]
   * @returns {*}
   */
  encryptHDWallet(password, wallet, encryptOptions) {
    const xPrv = bs58.decodeBase58(wallet.privateExtendedKey());
    const json = keystoreCrypto.encrypt(password, xPrv, encryptOptions);

    json.address = wallet.publicExtendedKey();

    return json;
  },

  /**
   * Decrypts a keystore into an ethereumjs Wallet
   *
   * @param password
   * @param v3Keystore
   * @returns {EthereumHDKey}
   */
  decryptHDWallet(password, v3Keystore) {
    const xPrv = keystoreCrypto.decrypt(password, v3Keystore);
    const xPrvString = bs58.encodeBase58(xPrv);

    return HDKey.fromExtendedKey(xPrvString);
  },
};

export default keystoreHDWallet;
