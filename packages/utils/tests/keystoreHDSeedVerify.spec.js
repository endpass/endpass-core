import keystoreHDSeedVerify from '@/keystoreHDSeedVerify';

import { seed } from 'fixtures/keystore';

describe('keystoreHDWallet', () => {
  it('shold return true if seed present', () => {
    expect(keystoreHDSeedVerify.verifySeed(seed)).toBeTruthy();
  });
  it('shold return false if seed present', () => {
    expect(keystoreHDSeedVerify.verifySeed('kek')).toBeFalsy();
  });
});
