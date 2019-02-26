import CustomProvider from '@/proxyRequest/provider/CustomProvider';

describe('CustomProvider', () => {
  const apiUrl = '/test/url/';
  const readResult = 'readResult';
  const connection = {};

  beforeEach(() => {
    connection.get = jest.fn().mockResolvedValue({ data: readResult });
    connection.post = jest.fn(async (url, payload) => {
      return { data: { success: true, payload } };
    });
    connection.delete = jest.fn(async (url, payload) => {
      return { data: { success: true, payload } };
    });
  });

  const instance = new CustomProvider(apiUrl, connection);

  describe('request methods', () => {
    describe('request methods', () => {
      it('should read data by serverProvider', async () => {
        expect.assertions(2);

        const data = await instance.request({
          url: `${apiUrl}account`,
          method: 'read',
        });

        expect(connection.get).toBeCalled();
        expect(data).toBe(readResult);
      });

      it('should read data by localProvider', async () => {
        expect.assertions(2);

        const data = await instance.request({
          url: `${apiUrl}tokens/123`,
          method: 'read',
        });

        expect(connection.get).not.toBeCalled();
        expect(data.length).toBe(0);
      });
    });

    it('should write data', async () => {
      expect.assertions(2);

      const checkAddr = 'checkAddr';
      const result = await instance.request({
        url: `${apiUrl}networks/123`,
        method: 'write',
        payload: {},
      });

      expect(connection.post).not.toBeCalled();
      expect(result.success).toBe(true);
    });

    it('should add data', async () => {
      expect.assertions(2);

      const result = await instance.request({
        url: `${apiUrl}networks/123`,
        method: 'add',
        payload: {},
      });

      expect(connection.post).not.toBeCalled();
      expect(result.success).toBe(true);
    });

    it('should remove data', async () => {
      expect.assertions(2);

      const result = await instance.request({
        url: `${apiUrl}networks/123`,
        method: 'remove',
        payload: {},
      });

      expect(connection.delete).not.toBeCalled();
      expect(result.success).toBe(true);
    });
  });
});
