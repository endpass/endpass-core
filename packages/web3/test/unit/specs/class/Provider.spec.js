import Provider from '@/class/Provider';
import ConnectionFactory from '@/Connections/ConnectionFactory';

jest.mock('@/Connections/ConnectionFactory', () => ({
  create: jest.fn(),
}));

describe('Provider class', () => {
  let provider;
  let connection;
  let handleSubscriptionEvent = () => {};
  let handleRequest = () => {};

  beforeEach(() => {
    connection = {
      subscribeRequest: jest.fn().mockImplementation(handler => {
        handleRequest = handler;
      }),
      subscribeEvent: jest.fn().mockImplementation(handler => {
        handleSubscriptionEvent = handler;
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

  describe('event handler', () => {
    const data = {
      jsonrpc: '2.0',
      result: 'result',
    };

    it('should emit event handler', async () => {
      expect.assertions(2);

      const handler = jest.fn();
      provider.subscribe(handler);

      handleSubscriptionEvent(data);

      expect(handler).toBeCalledTimes(1);
      expect(handler).toBeCalledWith(data);
    });

    it('should not use connection', () => {
      expect.assertions(1);

      const handler = jest.fn();
      provider.subscribe(handler);

      handleSubscriptionEvent(data);

      expect(connection.send).not.toBeCalled();
    });
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

    it('should use connection', async () => {
      expect.assertions(1);

      mockRequest();
      await provider.callMethod('method');

      expect(connection.send).toBeCalledTimes(1);
    });

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
