import keystoreHDWallet from '@/keystoreHDWallet';

import {
  privateKey,
  address,
  encryptOptions,
  mnemonic,
  xPubString,
  xPrvString,
  password,
  pubAddress,
  privateAddress,
} from 'fixtures/keystore';

describe('keystoreHDWallet', () => {
  const wallet = {
    getPrivateKey: () => privateKey,
    privateExtendedKey: () => xPrvString,
    getChecksumAddressString: () => address,
    publicExtendedKey: () => xPubString,
  };

  it('encrypts and decrypts an HD wallet', () => {
    const json = keystoreHDWallet.encryptHDWallet(
      password,
      wallet,
      encryptOptions,
    );
    expect(json.crypto).toBeTruthy();
    expect(json.address).toBe(xPubString);

    const decryptedWallet = keystoreHDWallet.decryptHDWallet(password, json);
    expect(decryptedWallet.privateExtendedKey()).toEqual(xPrvString);
  });

  it('should create hd wallet', () => {
    const returnedWallet = keystoreHDWallet.createHDWalletBySeed(mnemonic);

    expect(returnedWallet.privateExtendedKey()).toBe(privateAddress);
    expect(returnedWallet.publicExtendedKey()).toBe(pubAddress);
  });
});
