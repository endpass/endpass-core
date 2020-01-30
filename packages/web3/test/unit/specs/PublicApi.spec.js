import JSONBird from 'jsonbird';
import PublicApi from '@/PublicApi';

describe('PublicApi class', () => {
  let web3Instance;
  const httpNetUrl = 'http://some-url';
  const httpNetUrlNext = 'http://some-url-next';
  // const wsNetUrl = 'http://some-url';
  const address = '0x01';

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    web3Instance = new PublicApi({ netUrl: httpNetUrl });
  });

  const mockResponseOnce = fn => {
    fetch.mockResponseOnce(async req => {
      const body = await req.json();
      let response = fn;
      if (typeof fn === 'function') {
        response = await fn(req);
      }
      return new Promise(resolve => {
        resolve(
          JSON.stringify({
            id: body.id,
            jsonrpc: '2.0',
            ...response,
          }),
        );
      });
    });
  };

  it('should throw error, if something server return string', async () => {
    expect.assertions(1);

    fetch.mockResponse('error');

    try {
      await web3Instance.getBalance(address);
    } catch (e) {
      const err = Error('Something wrong with server response structure');
      const rpcErr = new JSONBird.RPCRequestError(err, 0);
      expect(e).toEqual(rpcErr);
    }
  });

  it('should throw error, if server return wrong object structure', async () => {
    expect.assertions(1);

    fetch.mockResponse({});

    try {
      await web3Instance.getBalance(address);
    } catch (e) {
      const err = Error('Something wrong with server response structure');
      const rpcErr = new JSONBird.RPCRequestError(err, 0);
      expect(e).toEqual(rpcErr);
    }
  });

  it('should return balance', async () => {
    expect.assertions(1);
    const balanceValue = '0x01';

    mockResponseOnce({
      result: balanceValue,
    });

    const balance = await web3Instance.getBalance(address);
    expect(balance).toBe(balanceValue);
  });

  it('should return balance for each network', async () => {
    expect.assertions(2);
    const firstBalance = '0x01';
    const secondBalance = '0x02';

    mockResponseOnce({
      result: firstBalance,
    });

    const initialBalancePromise = web3Instance.getBalance(address);

    web3Instance.setNetwork(httpNetUrlNext);

    mockResponseOnce({
      result: secondBalance,
    });
    const secondBalancePromise = web3Instance.getBalance(address);

    const firstResult = await initialBalancePromise;
    const secondResult = await secondBalancePromise;

    expect(firstResult).toBe(firstBalance);
    expect(secondResult).toBe(secondBalance);
  });

  it('should subscribe to balance changes', async () => {
    expect.assertions(2);
  });
});
