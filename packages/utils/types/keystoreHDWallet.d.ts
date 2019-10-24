/// <reference path="global.d.ts" />
/// <reference path="constants.d.ts" />

declare module '@endpass/utils/keystoreHDWallet' {
  export function createHDWalletBySeed(seedPhrase: string): EthereumHDKey;

  export function encryptHDWallet(
    password: string,
    wallet: Wallet,
    encryptOptions: KDFEncryptOptions
  ): AddressedKeystore;

  export function decryptHDWallet(
    password: string,
    v3Keystore: v3Keystore
  ): EthereumHDKey;
}
