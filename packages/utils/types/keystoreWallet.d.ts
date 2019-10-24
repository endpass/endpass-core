/// <reference path="global.d.ts" />
/// <reference path="constants.d.ts" />

declare module '@endpass/utils/keystoreWallet' {
  // @todo hdKeystore, any => ?
  export function createWalletByIndex(
    password: string,
    hdKeystore: object,
    index?: number
  ): object;

  // @todo wallet
  export function encryptWallet(
    password: string,
    wallet: object,
    encryptOptions: KDFEncryptOptions
  ): v3Keystore;

  // @todo any => Wallet
  export function decryptWallet(
    password: string,
    v3Keystore: v3Keystore
  ): any;
}
