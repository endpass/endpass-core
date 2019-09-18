type SignData = {
  message: string,
  messageHash: string,
  v: string,
  r: string,
  s: string,
  signature: string,
}

declare class Signer {
  static sign(data: string, privateKey: string | Buffer): SignData;

  static privateKeyToStr(privateKey: string | Buffer): string;
}
