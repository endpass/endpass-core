import Web3ResponseFabric from '@/class/Web3ResponseFabric';

describe('Web3ResponseFabric class', () => {
  const error = 'error';
  const result = 'result';

  it('should create default error', () => {
    const res = Web3ResponseFabric.createError(error);

    expect(res).toEqual({
      error,
      isNetworkChanged: false,
      result: null,
    });
  });

  it('should create with network changed', () => {
    const res = Web3ResponseFabric.createNetworkChanged();

    expect(res).toEqual({
      error: null,
      isNetworkChanged: true,
      result: null,
    });
  });

  it('should create result', () => {
    const res = Web3ResponseFabric.createSuccess(result);

    expect(res).toEqual({
      error: null,
      isNetworkChanged: false,
      result,
    });
  });
});
