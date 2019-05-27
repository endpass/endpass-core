import EthWallet from 'ethereumjs-wallet';
import keystoreCrypto from './keystoreCrypto';
import keystoreHDWallet from './keystoreHDWallet';

const keystoreWallet = {
  /**
   * Create Wallet from HD Wallet by index
   *
   * @param password
   * @param hdKeystore
   * @param index
   * @return {object}
   */
  createWalletByIndex(password, hdKeystore, index = 0) {
    const hdWallet = keystoreHDWallet.decryptHDWallet(password, hdKeystore);
    return hdWallet.deriveChild(index).getWallet();
  },

  /**
   * Encrypts an ethereumjs Wallet
   *
   * @param password
   * @param wallet
   * @param encryptOptions
   * @return {object} v3Keystore
   */
  encryptWallet(password, wallet, encryptOptions) {
    const json = keystoreCrypto.encrypt(
      password,
      wallet.getPrivateKey(),
      encryptOptions,
    );

    json.address = wallet.getChecksumAddressString();

    return json;
  },

  /**
   * Decrypts a keystore into an ethereumjs Wallet
   *
   * @param password
   * @param v3Keystore
   * @return {Wallet}
   */
  decryptWallet(password, v3Keystore) {
    const privateKey = keystoreCrypto.decrypt(password, v3Keystore);

    return EthWallet.fromPrivateKey(privateKey);
  },
};

export default keystoreWallet;
