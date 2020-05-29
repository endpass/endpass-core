import getFingerprint from '@/metricsFingerprint';

jest.mock('fingerprintjs2', () => {
  class Fingerprint {}

  Fingerprint.prototype.get = jest.fn().mockImplementation(handler =>
    handler(
      ['foo', 'bar'],
      [
        {
          key: 'foo',
          value: 'bar',
        },
      ],
    ),
  );

  return Fingerprint;
});

describe('metrics > metricsFingerprint', () => {
  it('should get fingerprint data through fingerprintjs2 library', async () => {
    expect.assertions(1);

    const fingerprint = await getFingerprint();

    expect(fingerprint).toEqual({
      foo: 'bar',
    });
  });
});
