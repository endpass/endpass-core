declare type KDFEncryptOptions = {
    kdf: string,
    n: number,
};

declare type HDKeyMnemonicPath = string;

declare module '@endpass/utils/constants' {
  export const KDF_ENCRYPT_OPTIONS: KDFEncryptOptions;
  export const HD_KEY_MNEMONIC_PATH: HDKeyMnemonicPath;
}