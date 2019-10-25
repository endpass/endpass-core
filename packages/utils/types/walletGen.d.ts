/// <reference path="constants.d.ts" />
/// <reference path="keystores.d.ts" />

declare module "@endpass/utils/walletGen" {
  export function createComplex(
    password: string,
    encryptOptions: KDFEncryptOptions
  ): Promise<{
    seedKey: string,
    encryptedSeed: string,
    v3KeystoreHdWallet: v3Keystore,
    v3KeystoreChildWallet: v3Keystore,
  }>;

  export function createHDWithChild(
    seedKey: string,
    password: string,
    encryptOptions: KDFEncryptOptions,
  ): {
    v3KeystoreHdWallet: v3Keystore,
    v3KeystoreChildWallet: v3Keystore,
  };
}
