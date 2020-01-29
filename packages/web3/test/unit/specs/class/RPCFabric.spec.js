import RPCFabric from '@/class/RPCFabric';

describe('RPCFabric class', () => {
  const id = 'id';
  const method = 'method';
  const params = ['param1', 'param2'];
  const jsonrpc = '2.0';

  it('should create request structure', () => {
    const res = RPCFabric.createRequest({ id, method, params });

    expect(res).toEqual({
      id,
      method,
      jsonrpc,
      params,
    });
  });

  it('should create response structure', () => {
    const res = RPCFabric.createEventAnswer({ method, params });

    expect(res).toEqual({
      method,
      jsonrpc,
      params,
    });
  });
});
