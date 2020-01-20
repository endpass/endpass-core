type KeythereumPrivateKey = {
  privateKey: Buffer;
  iv: Buffer;
  salt: Buffer;
};

declare module 'keythereum' {
  export function create(): KeythereumPrivateKey;

  export function privateKeyToAddress(): string;

  export function dump(
    password: string,
    privateKey: string | number[] | Buffer,
    salt: Buffer,
    iv: Buffer,
    dumpOptions: {
      kdf: string;
      kdfparams: KDFEncryptOptions;
    },
  ): V3Keystore;

  export function recover(password: string, v3Keystore: V3Keystore): Buffer;
}
