import JSONBird from 'jsonbird';
import PublicApi from '@/PublicApi';

describe('PublicApi class', () => {
  let web3Instance;
  const httpNetUrl = 'http://some-url';
  const httpNetUrlNext = 'http://some-url-next';
  // TODO: add websocket tests
  // const wsNetUrl = 'ws://some-url';
  const address = '0x01';

  const blockNumber = '0x0b1';

  jest.useFakeTimers();

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    if (web3Instance) web3Instance.destroy();
    web3Instance = new PublicApi({ netUrl: httpNetUrl });
  });

  const mockRPCResult = async (req, fn) => {
    const body = await req.json();
    let response = fn;
    if (typeof fn === 'function') {
      response = await fn(req, body);
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
  };

  const mockResponseOnce = fn => {
    fetch.mockResponseOnce(req => mockRPCResult(req, fn));
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

  describe('iterate balance http', () => {
    const iterateBalance = async cb => {
      for await (const data of web3Instance.iterateBalance(address)) {
        const res = cb(data);
        if (res === false) {
          break;
        }
      }
    };

    const getRequestBody = call => JSON.parse(call[1].body);

    it('should request method by order', async () => {
      expect.assertions(3);
      const balance = '0x07';

      mockResponseOnce({
        result: blockNumber,
      });
      mockResponseOnce({
        result: balance,
      });

      iterateBalance(() => false);

      await global.flushPromises();
      jest.runOnlyPendingTimers();

      const { calls } = fetch.mock;

      expect(calls).toHaveLength(2);
      expect(getRequestBody(calls[0]).method).toBe('eth_getBlockByNumber');
      expect(getRequestBody(calls[1]).method).toBe('eth_getBalance');
    });

    it('should return correct balance', async () => {
      expect.assertions(1);
      const balance = '0x08';
      const balanceHandler = jest.fn();

      mockResponseOnce({
        result: blockNumber,
      });
      mockResponseOnce({
        result: balance,
      });

      iterateBalance(data => {
        balanceHandler(data);
        return false;
      });

      await global.flushPromises();
      jest.runOnlyPendingTimers();
      await global.flushPromises();
      jest.runOnlyPendingTimers();

      expect(balanceHandler).toBeCalledWith({
        result: balance,
        error: false,
        isNetworkChanged: false,
      });
    });

    it('should send request to get balance once', async () => {
      expect.assertions(7);
      await global.flushPromises();

      const balance = '0x09';
      const balanceHandler = jest.fn();

      mockResponseOnce({
        result: blockNumber,
      });
      mockResponseOnce({
        result: balance,
      });
      mockResponseOnce({
        result: blockNumber,
      });
      mockResponseOnce({
        result: 'other-block',
      });

      iterateBalance(({ result }) => {
        balanceHandler(result);
      });

      await global.flushPromises();
      jest.runOnlyPendingTimers();
      await global.flushPromises();
      jest.runOnlyPendingTimers();
      await global.flushPromises();

      const { calls } = fetch.mock;

      expect(calls).toHaveLength(4);
      expect(getRequestBody(calls[0]).method).toBe('eth_getBlockByNumber');
      expect(getRequestBody(calls[1]).method).toBe('eth_getBalance');
      expect(getRequestBody(calls[2]).method).toBe('eth_getBlockByNumber');
      expect(getRequestBody(calls[3]).method).toBe('eth_getBlockByNumber');

      expect(balanceHandler).toBeCalledWith(balance);
      expect(balanceHandler).toBeCalledTimes(1);

      web3Instance.destroy();
    });

    it('should return error, if something goes wrong', async () => {
      expect.assertions(5);
      await global.flushPromises();

      const balanceHandler = jest.fn();

      mockResponseOnce({
        result: blockNumber,
      });
      mockResponseOnce({
        // result: balance,
        error: 'something bad',
      });

      iterateBalance(data => {
        balanceHandler(data);
        return false;
      });

      await global.flushPromises();
      jest.runOnlyPendingTimers();
      await global.flushPromises();
      jest.runOnlyPendingTimers();
      await global.flushPromises();

      const err = Error('something bad');
      const rpcErr = new JSONBird.RPCRequestError(err, 0);

      expect(balanceHandler).toBeCalledWith({
        result: undefined,
        isNetworkChanged: false,
        error: rpcErr,
      });
      expect(balanceHandler).toBeCalledTimes(1);

      const { calls } = fetch.mock;

      expect(calls).toHaveLength(2);
      expect(getRequestBody(calls[0]).method).toBe('eth_getBlockByNumber');
      expect(getRequestBody(calls[1]).method).toBe('eth_getBalance');
    });
  });
});
