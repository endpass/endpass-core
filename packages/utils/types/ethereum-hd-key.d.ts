declare class EthereumHDKey {
  privateExtendedKey(): string;

  publicExtendedKey(): string;

  derivePath(path: string): EthereumHDKey;

  deriveChild(index: number): EthereumHDKey;

  getWallet(): Wallet;
}
