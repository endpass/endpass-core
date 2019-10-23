declare type KDFEncryptOptions = {
    kdf: string,
    n: number,
};

declare module '@endpass/utils/constants' {
  const KDF_ENCRYPT_OPTIONS: KDFEncryptOptions;

  type HD_KEY_MNEMONIC_PATH = "m/44'/60'/0'/0";
}