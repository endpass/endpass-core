// @ts-check

import RPCFactory from '@/class/RPCFactory';

export default class HttpRequester {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * @param {object} sendData
   * @return {{headers: {'Content-Type': string}, method: string, body: string}}
   */
  static createRequest(sendData) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(sendData),
    };
  }

  /**
   * @private
   * @param {string} id
   * @return {*}
   */
  createServerError(
    id,
    message = 'Something wrong with server response structure',
  ) {
    return RPCFactory.createError({
      id,
      code: -100,
      error: new Error(message),
    });
  }

  /**
   * @param {string} id
   * @param {Response} response
   * @return {Promise<*>}
   */
  async resolve(id, response) {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      return this.createServerError(id);
    }

    const isValidRPC = data && data.jsonrpc && data.result && data.id;
    if (!isValidRPC) {
      const message =
        data && data.error ? data.error : 'Something wrong with receive data';
      return this.createServerError(id, message);
    }

    return data;
  }

  /**
   * @param {string} id
   * @param {Response} response
   * @return {Promise<*>}
   */
  async reject(id, response) {
    let message = 'Something wrong with request';
    try {
      message = await response.text();
    } catch (e) {}

    return RPCFactory.createError({
      id,
      code: -32000,
      error: new Error(message),
    });
  }

  /**
   * @param {object} sendData
   * @return {Promise<*>}
   */
  async send(sendData) {
    const response = await fetch(
      this.url,
      HttpRequester.createRequest(sendData),
    );

    if (response.ok) {
      return this.resolve(sendData.id, response);
    }

    return this.reject(sendData.id, response);
  }
}
