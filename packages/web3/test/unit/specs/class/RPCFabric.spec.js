import RPCFactory from '@/class/RPCFactory';

describe('RPCFactory class', () => {
  const id = 'id';
  const method = 'method';
  const params = ['param1', 'param2'];
  const jsonrpc = '2.0';

  it('should create request structure', () => {
    const res = RPCFactory.createRequest({ id, method, params });

    expect(res).toEqual({
      id,
      method,
      jsonrpc,
      params,
    });
  });

  it('should create response structure', () => {
    const res = RPCFactory.createEventAnswer({ method, params });

    expect(res).toEqual({
      method,
      jsonrpc,
      params,
    });
  });
});
