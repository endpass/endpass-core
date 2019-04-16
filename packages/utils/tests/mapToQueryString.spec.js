import mapToQueryString from '@/mapToQueryString';

describe('appendQueryParametersToUrl', () => {
  it('should append query parameters to url', () => {
    expect(
      mapToQueryString('https://foo.bar', {
        foo: 'bar',
        bar: 'baz',
      }),
    ).toBe('https://foo.bar?foo=bar&bar=baz');
    expect(
      mapToQueryString('https://foo.bar?foo=bar', {
        bar: 'baz',
      }),
    ).toBe('https://foo.bar?foo=bar&bar=baz');
  });
});
