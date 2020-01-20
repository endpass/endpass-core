declare class Wallet {
  static fromPrivateKey(key: Buffer): Wallet;

  static fromV3(json: string, password: string): Wallet;

  getPrivateKey(): Buffer;

  getAddressString(): string;

  getChecksumAddressString(): string;
}
