declare module '@endpass/utils/walletGen' {
  function createComplex(password: any, encryptOptions: any): Promise<any>;
  function createHDWithChild(seedKey: any, password: any, encryptOptions: any): object;
}
