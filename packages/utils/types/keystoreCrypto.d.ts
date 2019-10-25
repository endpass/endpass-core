/// <reference path="constants.d.ts" />
/// <reference path="keystores.d.ts" />

declare module '@endpass/utils/keystoreCrypto' {
  export function encrypt(
    password: string,
    privateKey: string | Buffer,
    options: KDFEncryptOptions
  ): V3KeystoreWithoutAddress;

  export function decrypt(
    password: string,
    v3Keystore: V3Keystore
  ): Buffer;
}
