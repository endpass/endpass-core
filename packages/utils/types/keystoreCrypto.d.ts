/// <reference path="global.d.ts" />
/// <reference path="constants.d.ts" />

declare module '@endpass/utils/keystoreCrypto' {
  export function encrypt(
    password: string,
    privateKey: string | Buffer,
    options: KDFEncryptOptions
  ): Keystore;

  export function decrypt(
    password: string,
    v3Keystore: v3Keystore
  ): Buffer;
}
