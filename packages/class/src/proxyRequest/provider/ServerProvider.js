import privateMethods from './privateMethods';

export default class ServerProvider {
  constructor(serverUrl, connection) {
    this.url = serverUrl;
    this.connection = connection;
  }

  request(params) {
    const { method } = params;
    const methodName = privateMethods[method];
    return this[methodName](params);
  }

  [privateMethods.add](params) {
    return this[privateMethods.write](params);
  }

  [privateMethods.read] = async params => {
    try {
      const { url, headers = {} } = params;
      const { data } = await this.connection.get(url, {
        headers,
      });

      return data;
    } catch (e) {
      e.title = 'Error in server storage';
      e.text = "Can't read data from server storage, maybe it is not available";
      e.type = 'is-warning';

      throw e;
    }
  };

  [privateMethods.write] = async params => {
    try {
      const { url, payload, headers = {} } = params;
      const { data } = await this.connection.post(url, payload, {
        headers,
      });

      return data;
    } catch (e) {
      e.title = 'Error in server storage';
      e.text = "Can't save data to server storage, maybe it is not available";
      e.type = 'is-warning';

      throw e;
    }
  };

  [privateMethods.remove] = async params => {
    try {
      const { url, headers = {} } = params;
      const { data } = await this.connection.delete(url, {
        headers
      });

      return data;
    } catch (e) {
      e.title = 'Error in server storage';
      e.text =
        "Can't remove data from server storage, maybe it is not available";
      e.type = 'is-warning';

      throw e;
    }
  };

  [privateMethods.clear] = async () => ({ success: true });
}
