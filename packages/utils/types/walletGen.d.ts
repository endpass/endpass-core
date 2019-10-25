/// <reference path="constants.d.ts" />
/// <reference path="keystores.d.ts" />

declare module "@endpass/utils/walletGen" {
  export function createComplex(
    password: string,
    encryptOptions: KDFEncryptOptions
  ): Promise<{
    seedKey: string,
    encryptedSeed: string,
    v3KeystoreHdWallet: V3Keystore,
    v3KeystoreChildWallet: V3Keystore,
  }>;

  export function createHDWithChild(
    seedKey: string,
    password: string,
    encryptOptions: KDFEncryptOptions,
  ): {
    v3KeystoreHdWallet: V3Keystore,
    v3KeystoreChildWallet: V3Keystore,
  };
}
