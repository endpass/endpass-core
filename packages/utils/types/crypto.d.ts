declare module '@endpass/utils/crypto' {
  export function encrypt(
    data: string | Buffer | ArrayBuffer | Array<number | string>,
    publicKey: string
  ): string;

  export function decrypt(
    data: string | Buffer | ArrayBuffer | Array<number | string>,
    privateKey: string
  ): string;
}
