import keystore from '@/keystore';

describe('keystore', () => {
  // Extended keys
  const xPrvString =
    'xprv9s21ZrQH143K3DAahVuXkkfZxprW7emgvd19zzSEb2zBxR9mWnMFtzGCwmYCq8YQh21ZqFAcPWtWJXz9sbEXaN9LUSe2cjsw9LkAtwmoWsc';
  const xPubString =
    'xpub661MyMwAqRbcFhF3oXSY7tcJWrgzX7VYHqvkoNqr9NXAqDUv4KfWSnago4BMD4yty2cX6f6jLeQefve3nKriVY6c18NLzCmHdKqWeN8VHkJ';

  it('detects an extended public key', () => {
    const xPub = keystore.decodeBase58(xPubString);
    expect(keystore.isExtendedPublicKey(xPubString)).toBeTruthy();
    expect(keystore.isExtendedPublicKey(xPrvString)).toBeFalsy();
    expect(keystore.isExtendedPublicKey(xPub)).toBeTruthy();
  });

  it('detects an extended private key', () => {
    const xPrv = keystore.decodeBase58(xPrvString);
    expect(keystore.isExtendedPrivateKey(xPrvString)).toBeTruthy();
    expect(keystore.isExtendedPrivateKey(xPubString)).toBeFalsy();
    expect(keystore.isExtendedPrivateKey(xPrv)).toBeTruthy();
  });

  it('detects an invalid v3 wallet', () => {
    expect(keystore.isV3({})).toBeFalsy();
  });
});
