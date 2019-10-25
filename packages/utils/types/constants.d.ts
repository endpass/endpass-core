declare namespace KDFTypes {
  type KdfProperty = 'scrypt';

  type EncryptOptions = {
    kdf: KdfProperty,
    n: number,
  }
}

// Just shorthand for the KDFTypes.EncryptOptions type
declare type KDFEncryptOptions = KDFTypes.EncryptOptions;

declare module '@endpass/utils/constants' {
  export const KDF_ENCRYPT_OPTIONS: KDFTypes.EncryptOptions;
  export const HD_KEY_MNEMONIC_PATH: "m/44'/60'/0'/0";
}