declare module 'bs58check' {
  export function encode(key: string | number[] | Buffer): string;

  export function decode(key: string | number[] | Buffer): Buffer;
}
