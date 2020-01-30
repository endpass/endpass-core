// @ts-check

export default class HttpRequester {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
  }

  /**
   *
   * @param {Response} response
   * @return {Promise<*>}
   */
  async resolve(response) {
    const data = await response.json();
    return data;
  }

  /**
   *
   * @param {object} data
   * @param {Response} response
   * @return {Promise<{code: *, id: *, jsonrpc: string, error: Error}>}
   */
  async reject(data, response) {
    let message = 'Something wrong with request';
    try {
      message = await response.text();
    } catch (e) {}

    return {
      id: data.id,
      jsonrpc: '2.0',
      code: response.status,
      error: new Error(message),
    };
  }

  /**
   * @param {object} object
   * @return {Promise<any>}
   */
  async post(object) {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(object),
    };

    const response = await fetch(this.url, params);
    if (response.ok) {
      return this.resolve(response);
    }
    return this.reject(object, response);
  }
}
