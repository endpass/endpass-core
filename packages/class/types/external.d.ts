declare module 'eth-lib/lib/hash' {
  function keccak256s(data: string | Buffer): string;
}

declare module 'eth-lib/lib/account' {
  function sign(messageHash: string, privateKey: string): string;

  function decodeSignature(data: string): string[];

  function recover(hash: string, signature: string): string;

  function encodeSignature(signature: string[]): string;
}
