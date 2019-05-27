import keystoreWallet from '@/keystoreWallet';

const encryptOptions = {
  kdf: 'scrypt',
  n: 4,
};

describe('keystoreWallet', () => {
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

  it('encrypts and decrypts a regular wallet', () => {
    const json = keystoreWallet.encryptWallet(password, wallet, encryptOptions);
    expect(json.crypto).toBeTruthy();
    expect(json.address).toBe(address);

    const decryptedWallet = keystoreWallet.decryptWallet(password, json);
    expect(decryptedWallet.getPrivateKeyString()).toEqual(`0x${privateKey}`);
  });
});
