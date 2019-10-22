import { KDF_ENCRYPT_OPTIONS } from './src/constants';

declare namespace walletGen {
  function createComplex(
    password: string,
    encryptOptions: typeof KDF_ENCRYPT_OPTIONS,
  ): Promise<any>;

  function createHDWithChild(
    seedKey: string,
    password: string,
    encryptOptions: typeof KDF_ENCRYPT_OPTIONS,
  ): object;
}

export default walletGen;