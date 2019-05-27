import walletGen from '@/walletGen';

import {
  childAddress,
  pubAddress,
  encryptOptions,
  mnemonic,
  password,
} from 'fixtures/keystore';

describe('walletGen', () => {
  it('should create child wallet by seed', () => {
    const {
      v3KeystoreHdWallet,
      v3KeystoreChildWallet,
    } = walletGen.createHDWithChild(mnemonic, password, encryptOptions);

    expect(v3KeystoreChildWallet.address).toBe(childAddress);
    expect(v3KeystoreHdWallet.address).toBe(pubAddress);
  });
});
