/// <reference path="global.d.ts" />

declare module '@endpass/utils/keystoreKeyGen' {
  export function getPublicKey(password: string, v3Keystore: v3Keystore): string;
  export function getPrivateKey(password: string, v3Keystore: v3Keystore): string;
}
