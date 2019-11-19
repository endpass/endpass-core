/* eslint-disable no-dupe-class-members */
type SignData = {
  message: string;
  messageHash: string;
  v: string;
  r: string;
  s: string;
  signature: string;
};

declare class Signer {
  static sign(data: string, privateKey: string | Buffer): SignData;

  static privateKeyToStr(privateKey: string | Buffer): string;

  static hashMessage(data: string): string;

  static recover(
    message: string,
    signature: string,
    preFixed?: boolean,
  ): string;

  static recover(message: SignData): string;

  static recover(
    message: string,
    v: string,
    r: string,
    s: string,
    preFixed?: boolean,
  ): string;
}

export default Signer;
