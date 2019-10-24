declare module '@endpass/utils/bs58' {
  export function encodeBase58(key: string | number[]): string;
  export function decodeBase58(key: string | number[]): number[];
}
