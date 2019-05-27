import keystoreHDWallet from '@/keystoreHDWallet';

const encryptOptions = {
  kdf: 'scrypt',
  n: 4,
};

const mnemonic =
  'seed sock milk update focus rotate barely fade car face mechanic mercy';

jest.disableAutomock();

describe('keystoreHDWallet', () => {
  // Extended keys
  const xPrvString =
    'xprv9s21ZrQH143K3DAahVuXkkfZxprW7emgvd19zzSEb2zBxR9mWnMFtzGCwmYCq8YQh21ZqFAcPWtWJXz9sbEXaN9LUSe2cjsw9LkAtwmoWsc';
  const xPubString =
    'xpub661MyMwAqRbcFhF3oXSY7tcJWrgzX7VYHqvkoNqr9NXAqDUv4KfWSnago4BMD4yty2cX6f6jLeQefve3nKriVY6c18NLzCmHdKqWeN8VHkJ';
  const privateKey =
    'efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378';
  const address = '0xB14Ab53E38DA1C172f877DBC6d65e4a1B0474C3c';

  const password = 'password123';

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
      'xprvA137uQCci13rPAYaPDGXjbU5Kxsng2WCnC3XGcwidiXfcT2c1Q5ntXQC7EggLSfKsEnZHGw8mThsyHV5DzxHgRwgusfYf6wPuBLryx8C9KX',
    );
    expect(returnedWallet.publicExtendedKey()).toBe(
      'xpub6E2UJujWYNc9bed3VEoY6jQosziH5VE49Qy851MLC44eVFMkYwQ3SKifxXf6MERMs4WDSrQE25hyqLeN46zEUoEcpxaqX3JfbioRnwDebto',
    );
  });
});
