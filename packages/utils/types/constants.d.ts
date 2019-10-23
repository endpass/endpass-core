declare type KDFEncryptOptions = {
  kdf: 'scrypt',
  n: 8192,
};

declare module '@endpass/utils/constants' {
  export const KDF_ENCRYPT_OPTIONS: KDFEncryptOptions;
  export const HD_KEY_MNEMONIC_PATH: "m/44'/60'/0'/0";
}