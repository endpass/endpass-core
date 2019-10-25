declare type KDFEncryptScryptProperty = 'scrypt';

declare type KDFEncryptOptions = {
  kdf: KDFEncryptScryptProperty,
  n: number,
};

declare module '@endpass/utils/constants' {
  export const KDF_ENCRYPT_OPTIONS: KDFEncryptOptions;
  export const HD_KEY_MNEMONIC_PATH: "m/44'/60'/0'/0";
}