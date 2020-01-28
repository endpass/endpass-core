// @ts-check

export default class HttpRequester {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
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
      const data = await response.json();
      return data;
    }

    let message = 'Something wrong with request';
    try {
      message = await response.text();
    } catch (e) {}
    return {
      id: object.id,
      jsonrpc: '2.0',
      code: response.status,
      error: new Error(message),
    };
  }
}
