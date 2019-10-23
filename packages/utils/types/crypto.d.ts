declare module '@endpass/utils/crypto' {
  export function encrypt(
    data: string | Buffer | ArrayBuffer | any[],
    publicKey: string
  ): string;

  export function decrypt(
    data: string | Buffer | ArrayBuffer | any[],
    privateKey: string
  ): string;
}
