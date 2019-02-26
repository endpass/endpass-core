import ServerProvider from '@/proxyRequest/provider/ServerProvider';

describe('ServerProvider', () => {
  const apiUrl = '/test/url/';
  const readResult = 'readResult';
  const connection = {};
  const instance = new ServerProvider(apiUrl, connection);

  beforeEach(() => {
    connection.get = jest.fn().mockResolvedValue({ data: readResult });
    connection.post = jest.fn(async (url, payload) => {
      return { data: { success: true, payload } };
    });
    connection.delete = jest.fn(async (url, payload) => {
      return { data: { success: true, payload } };
    });
  });

  describe('request methods', () => {
    it('should read data', async () => {
      expect.assertions(2);

      const data = await instance.request({
        url: `${apiUrl}account`,
        method: 'read',
      });

      expect(connection.get).toBeCalled();
      expect(data).toBe(readResult);
    });

    it('should write data', async () => {
      expect.assertions(3);

      const checkAddr = 'checkAddr';
      const result = await instance.request({
        url: `${apiUrl}account`,
        method: 'write',
        payload: {
          address: checkAddr,
          data: 'testData',
        },
      });

      expect(connection.post).toBeCalled();
      expect(result.payload.address).toBe(checkAddr);
      expect(result.success).toBe(true);
    });

    it('should add data', async () => {
      expect.assertions(3);

      const checkAddr = 'checkAddr';
      const result = await instance.request({
        url: `${apiUrl}account`,
        method: 'add',
        payload: {
          address: checkAddr,
          data: 'testData',
        },
      });

      expect(connection.post).toBeCalled();
      expect(result.payload.address).toBe(checkAddr);
      expect(result.success).toBe(true);
    });

    it('should remove data', async () => {
      expect.assertions(3);

      const checkAddr = 'checkAddr';
      const result = await instance.request({
        url: `${apiUrl}account`,
        method: 'remove',
        payload: {
          address: checkAddr,
          data: 'testData',
        },
      });

      expect(connection.delete).toBeCalled();
      expect(result.payload.address).toBe(checkAddr);
      expect(result.success).toBe(true);
    });
  });
});
