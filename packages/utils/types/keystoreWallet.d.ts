/// <reference path="constants.d.ts" />
/// <reference path="ethereum.d.ts" />
/// <reference path="keystores.d.ts" />

declare module '@endpass/utils/keystoreWallet' {
  export function createWalletByIndex(
    password: string,
    hdKeystore: V3Keystore,
    index?: number
  ): Wallet;

  export function encryptWallet(
    password: string,
    wallet: Wallet,
    encryptOptions: KDFEncryptOptions
  ): V3Keystore;

  export function decryptWallet(
    password: string,
    v3Keystore: V3Keystore
  ): Wallet;
}
