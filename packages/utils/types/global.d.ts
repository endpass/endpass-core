// Private unexported namespace which visible only within this file
declare namespace private {
  // Common template type for key stores
  type BasicKeystore = {
    id: string,
    version: 3,

    crypto: {
      cipher: string,
      ciphertext: string,
      cipherparams: {
        iv: string,
      },
      mac: string,
      kdf: string,

      // In the basic key store kdfparams may accept any object value
      // Note that this is common, generic type which should not be used
      // out of bounds of this file
      kdfparams: object,
    },
  };

  // Common template type for addressed keystores
  type BasicAddressedKeystore = {
    address: string,
  } & BasicKeystore;
}

// Keystore types
declare type v3Keystore = {
  crypto: {
    kdfparams: {
      dklen: number,
      n: number,
      r: number,
      p: number,
      salt: string,
    },
  },
} & private.BasicAddressedKeystore;

declare type v3KeystoreWithoutAddress = {
  crypto: {
    kdfparams: {
      dklen: number,
      n: number,
      r: number,
      p: number,
      salt: string,
    },
  },
} & private.BasicKeystore;

// Ethereum types
declare class Wallet {
  static fromPrivateKey(key: Buffer): Wallet;
  static fromV3(json: string, password: string): Wallet;
}

declare class EthereumHDKey {
  privateExtendedKey (): string;
  publicExtendedKey (): string;
  derivePath (path: string): EthereumHDKey;
  deriveChild (index: number): EthereumHDKey;
  getWallet (): Wallet;
}