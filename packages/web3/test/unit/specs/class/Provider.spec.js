import Provider from '@/class/Provider';
import ConnectionFactory from '@/Connections/ConnectionFactory';

jest.mock('@/Connections/ConnectionFactory', () => ({
  create: jest.fn(),
}));

describe('Provider class', () => {
  let provider;
  let connection;
  let handleEvent = () => {};
  let handleRequest = () => {};

  beforeEach(() => {
    connection = {
      subscribeRequest: jest.fn().mockImplementation(handler => {
        handleRequest = handler;
      }),
      subscribeEvent: jest.fn().mockImplementation(handler => {
        handleEvent = handler;
      }),
      send: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
    };
    ConnectionFactory.create.mockImplementation(() => connection);
    provider = new Provider('netUrl');
  });

  it('should subscribe to connection', () => {
    expect(connection.subscribeRequest).toBeCalledTimes(1);
    expect(connection.subscribeEvent).toBeCalledTimes(1);
  });

  it('should emit event handler', async () => {
    expect.assertions(2);

    const handler = jest.fn();
    const result = 'result';
    provider.subscribe(handler);
    connection.send.mockImplementationOnce(data => {
      const request = {
        id: data.id,
        jsonrpc: '2.0',
        result,
      };
      handleRequest(request);
    });

    handleEvent({
      jsonrpc: '2.0',
      result,
    });

    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(1);
  });

  describe('callMethod', () => {
    const mockRequest = (result = 'result') => {
      connection.send.mockImplementationOnce(data => {
        const request = {
          id: data.id,
          jsonrpc: '2.0',
          result,
        };
        handleRequest(request);
      });
    };

    it('should create connection', async () => {
      expect.assertions(1);

      mockRequest();
      await provider.callMethod('method');

      expect(connection.create).toBeCalledTimes(1);
    });

    it('should not observe handler', async () => {
      expect.assertions(1);

      const handler = jest.fn();
      provider.subscribe(handler);
      mockRequest();
      await provider.callMethod('method');

      expect(handler).not.toBeCalled();
    });

    it('should return data by callMethod', async () => {
      expect.assertions(1);

      const result = 'result';
      mockRequest(result);

      const callResult = await provider.callMethod('method');

      expect(callResult).toBe(result);
    });
  });
});
