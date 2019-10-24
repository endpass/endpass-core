declare module '@endpass/utils/keystoreKeyVerify' {
  export function verifyPublicKey(
    value: string
  ): boolean;

  export function verifyPrivateKey(
    value: string
  ): boolean;
}
