/// <reference path="constants.d.ts" />

declare namespace walletGen {
  function createComplex(
    password: string,
    encryptOptions: KDFEncryptOptions,
  ): Promise<any>;

  function createHDWithChild(
    seedKey: string,
    password: string,
    encryptOptions: KDFEncryptOptions,
  ): object;
}

export default walletGen;