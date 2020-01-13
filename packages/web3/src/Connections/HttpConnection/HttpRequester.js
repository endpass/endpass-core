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
   * @return {Promise<Response>}
   */
  post(object) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(object),
    });
  }
}
