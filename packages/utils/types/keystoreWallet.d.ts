/// <reference path="global.d.ts" />
/// <reference path="constants.d.ts" />

declare module '@endpass/utils/keystoreWallet' {
  export function createWalletByIndex(
    password: string,
    hdKeystore: v3Keystore,
    index?: number
  ): object;

  export function encryptWallet(
    password: string,
    wallet: Wallet,
    encryptOptions: KDFEncryptOptions
  ): v3Keystore;

  export function decryptWallet(
    password: string,
    v3Keystore: v3Keystore
  ): Wallet;
}
