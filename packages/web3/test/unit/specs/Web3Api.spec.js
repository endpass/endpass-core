import JSONBird from 'jsonbird';
import Web3Api from '@/Web3Api';

describe('PublicApi class', () => {
  let web3Instance;
  const httpNetUrl = 'http://some-url';
  // const wsNetUrl = 'http://some-url';
  const address = '0x01';

  const getBalance = async (addr = address) => {
    const balance = await web3Instance.call('eth_getBalance', addr, 'latest');
    return balance;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    web3Instance = new Web3Api({ netUrl: httpNetUrl });
  });

  it('should throw error, if something server return string', async () => {
    expect.assertions(1);

    fetch.mockResponse('error');

    try {
      await getBalance();
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
      await getBalance();
    } catch (e) {
      const err = Error('Something wrong with server response structure');
      const rpcErr = new JSONBird.RPCRequestError(err, 0);
      expect(e).toEqual(rpcErr);
    }
  });

  it('should return balance', async () => {
    expect.assertions(1);
    const balanceValue = '0x01';

    fetch.mockResponse(
      JSON.stringify({
        jsonrpc: '2.0',
        result: balanceValue,
      }),
    );

    const balance = await getBalance();
    expect(balance).toBe(balanceValue);
  });
});
