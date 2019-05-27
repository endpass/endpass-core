import keystoreHDWallet from '@/keystoreHDWallet';

import {
  privateKey,
  address,
  encryptOptions,
  mnemonic,
  xPubString,
  xPrvString,
  password,
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

    expect(returnedWallet.privateExtendedKey()).toBe(
      'xprv9zpP9a8JJEt3DTXfyMifdLGmvQbKDa1b9Dg6TvptgyApaRPA8tcKWnSfuoQy8yhhPNwrYBXxyW7cs1Auf7yj7XxnCD316XpagBUKx5eHdpY',
    );
    expect(returnedWallet.publicExtendedKey()).toBe(
      'xpub6DojZ5fC8cSLRwc95PFfzUDWUSRod2jSWSbhGKEWFJhoTDiJgRva4am9m7ex1Fm1Ege8MDQ7PNEFqkzdgsRS6UooRfDZpgHkD8vNHiMP3zq',
    );
  });
});
