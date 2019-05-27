import isV3 from '@/isV3';

describe('isV3', () => {
  it('detects an invalid v3 wallet', () => {
    expect(isV3({})).toBe(false);
  });

  it('detects a valid v3 wallet', () => {
    expect(
      isV3({
        crypto: {
          ciphertext: 'text',
        },
      }),
    ).toBe(true);
  });
});
