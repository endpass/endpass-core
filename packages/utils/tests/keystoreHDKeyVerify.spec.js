import bs58 from '@/bs58';
import keystoreHDKeyVerify from '@/keystoreHDKeyVerify';
import { xPrvString, xPubString } from 'fixtures/keystore';

describe('keystoreHDKeyVerify', () => {
  it('detects an extended public key', () => {
    const xPub = bs58.decodeBase58(xPubString);
    expect(keystoreHDKeyVerify.isExtendedPublicKey(xPubString)).toBeTruthy();
    expect(keystoreHDKeyVerify.isExtendedPublicKey(xPrvString)).toBeFalsy();
    expect(keystoreHDKeyVerify.isExtendedPublicKey(xPub)).toBeTruthy();
  });

  it('detects an extended private key', () => {
    const xPrv = bs58.decodeBase58(xPrvString);
    expect(keystoreHDKeyVerify.isExtendedPrivateKey(xPrvString)).toBeTruthy();
    expect(keystoreHDKeyVerify.isExtendedPrivateKey(xPubString)).toBeFalsy();
    expect(keystoreHDKeyVerify.isExtendedPrivateKey(xPrv)).toBeTruthy();
  });
});
