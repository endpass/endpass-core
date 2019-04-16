import queryStringToMap from '@/queryStringToMap';

describe('get query params', () => {
  it('should returns empty object', () => {
    const params = queryStringToMap('');
    expect(params).toEqual({});
  });

  it('should returns parsed string as object', () => {
    const params = queryStringToMap('mode=test&param=1&notDefined&last=last');
    expect(params).toEqual({
      mode: 'test',
      param: '1',
      notDefined: undefined,
      last: 'last',
    });

    expect(queryStringToMap('')).toEqual({});
    expect(queryStringToMap('?')).toEqual({});
    expect(queryStringToMap('foo=bar&bar=baz')).toEqual({
      foo: 'bar',
      bar: 'baz',
    });
    expect(queryStringToMap('?foo=bar&bar=baz')).toEqual({
      foo: 'bar',
      bar: 'baz',
    });
    expect(queryStringToMap('?camel-case=foo&camel_case_too=bar')).toEqual({
      'camel-case': 'foo',
      camel_case_too: 'bar',
    });
  });
});
