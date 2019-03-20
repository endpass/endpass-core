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
      last: 'last'
    });
  });
});
