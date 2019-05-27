import keystoreWallet from '@/keystoreWallet';
import keystoreHDWallet from '@/keystoreHDWallet';

import {
  privateKey,
  address,
  childAddress,
  encryptOptions,
  mnemonic,
  xPubString,
  xPrvString,
  password,
} from 'fixtures/keystore';

describe('keystoreWallet', () => {
  const wallet = {
    getPrivateKey: () => privateKey,
    privateExtendedKey: () => xPrvString,
    getChecksumAddressString: () => address,
    publicExtendedKey: () => xPubString,
  };

  it('encrypts and decrypts a regular wallet', () => {
    const json = keystoreWallet.encryptWallet(password, wallet, encryptOptions);
    expect(json.crypto).toBeTruthy();
    expect(json.address).toBe(address);

    const decryptedWallet = keystoreWallet.decryptWallet(password, json);
    expect(decryptedWallet.getPrivateKeyString()).toEqual(`0x${privateKey}`);
  });

  it('should create child wallet by seed', () => {
    const hdWallet = keystoreHDWallet.createHDWalletBySeed(mnemonic);

    const v3KeystoreHdWallet = keystoreHDWallet.encryptHDWallet(
      password,
      hdWallet,
      encryptOptions,
    );

    // create first child
    const childWallet = keystoreWallet.createWalletByIndex(
      password,
      v3KeystoreHdWallet,
      0,
      encryptOptions,
    );

    const v3KeystoreChildWallet = keystoreWallet.encryptWallet(
      password,
      childWallet,
      encryptOptions,
    );

    expect(v3KeystoreChildWallet.address).toBe(childAddress);
  });
});
