/// <reference path="global.d.ts" />

declare module '@endpass/utils/keystoreHDWallet' {
  // @todo object => HDKey (?)
  export function createHDWalletBySeed(seedPhrase: string): object;

  // @todo encryptOptions, wallet
  export function encryptHDWallet(
    password: string,
    wallet: object,
    encryptOptions: object
  ): AddressedKeyObject;

  // @todo object => HDKey (?)
  export function decryptHDWallet(
    password: string,
    v3Keystore: v3Keystore
  ): object;
}
