declare module 'eth-ecies' {
  export function encrypt(publicKey: string | Buffer, data: Buffer): Buffer;

  export function decrypt(privateKey: string | Buffer, data: Buffer): Buffer;
}
