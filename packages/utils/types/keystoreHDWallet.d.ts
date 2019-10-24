/// <reference path="global.d.ts" />
/// <reference path="constants.d.ts" />

declare module '@endpass/utils/keystoreHDWallet' {
  // @todo object => HDKey (?)
  export function createHDWalletBySeed(seedPhrase: string): object;

  // @todo encryptOptions, wallet
  export function encryptHDWallet(
    password: string,
    wallet: object,
    encryptOptions: KDFEncryptOptions
  ): AddressedKeystore;

  // @todo object => HDKey (?)
  export function decryptHDWallet(
    password: string,
    v3Keystore: v3Keystore
  ): object;
}
