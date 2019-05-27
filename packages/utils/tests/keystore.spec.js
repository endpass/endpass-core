import keystore from '@/keystore';
import { xPrvString, xPubString } from 'fixtures/keystore';

describe('keystore', () => {
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
