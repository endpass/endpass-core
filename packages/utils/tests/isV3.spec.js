import isV3 from '@/isV3';

describe('isV3', () => {
  it('detects an invalid v3 wallet', () => {
    expect(isV3({})).toBeFalsy();
  });
});
