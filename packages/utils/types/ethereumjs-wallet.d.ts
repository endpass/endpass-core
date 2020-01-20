declare module 'ethereumjs-wallet' {
  export function fromPrivateKey(privateKey: Buffer): Wallet;
}

declare module 'ethereumjs-wallet/hdkey' {
  export function fromMasterSeed(
    password: Buffer,
    xPrv?: string,
    encryptOptions?: KDFEncryptOptions,
  ): EthereumHDKey;

  export function fromExtendedKey(xPrv: string): EthereumHDKey;
}
