declare class Wallet {
  static fromPrivateKey(key: Buffer): Wallet;
  static fromV3(json: string, password: string): Wallet;
  getPrivateKey(): Buffer;
  getAddressString(): string;
  getChecksumAddressString(): string;
}

declare class EthereumHDKey {
  privateExtendedKey (): string;
  publicExtendedKey (): string;
  derivePath (path: string): EthereumHDKey;
  deriveChild (index: number): EthereumHDKey;
  getWallet (): Wallet;
}