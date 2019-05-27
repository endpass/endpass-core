import keystoreCrypto from '@/keystoreCrypto';
import bs58 from '@/bs58';
import { KDF_ENCRYPT_OPTIONS } from '@/constants';

describe('keystoreCrypto', () => {
  const encryptOptions = {
    kdf: 'scrypt',
    n: 4,
  };
  const xPrvString =
    'xprv9s21ZrQH143K3DAahVuXkkfZxprW7emgvd19zzSEb2zBxR9mWnMFtzGCwmYCq8YQh21ZqFAcPWtWJXz9sbEXaN9LUSe2cjsw9LkAtwmoWsc';

  const password = 'password123';

  it('encrypts and decrypts an extended key', () => {
    const xPrv = bs58.decodeBase58(xPrvString);
    expect(xPrv.length).toBe(78);

    const json = keystoreCrypto.encrypt(password, xPrv, encryptOptions);
    expect(json.address).toBeUndefined();
    expect(json.crypto.ciphertext).toBeTruthy();
    expect(json.crypto.kdfparams.n).toBe(encryptOptions.n);
    const xPrvOut = keystoreCrypto.decrypt(password, json);
    expect(xPrvOut.length).toBe(78);

    const xPrvOutString = bs58.encodeBase58(xPrv);
    expect(xPrvOutString).toBe(xPrvString);
  });

  it('encrypts with default options', () => {
    const xPrv = bs58.decodeBase58(xPrvString);
    expect(xPrv.length).toBe(78);

    const json = keystoreCrypto.encrypt(password, xPrv);
    expect(json.address).toBeUndefined();
    expect(json.crypto.ciphertext).toBeTruthy();
    expect(json.crypto.kdfparams.n).toBe(KDF_ENCRYPT_OPTIONS.n);
    const xPrvOut = keystoreCrypto.decrypt(password, json);
    expect(xPrvOut.length).toBe(78);

    const xPrvOutString = bs58.encodeBase58(xPrv);
    expect(xPrvOutString).toBe(xPrvString);
  });
});
