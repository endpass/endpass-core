// @ts-check

import RPCFabric from '@/class/RPCFabric';

export default class HttpRequester {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * @param {*} data
   * @return {boolean}
   */
  static isJSONRpcFormat(data) {
    if (!data || !data.jsonrpc) {
      return false;
    }
    return true;
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
  serverFail(id) {
    return RPCFabric.createError({
      id,
      code: -100,
      error: new Error('Something wrong with server response structure'),
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
      return this.serverFail(id);
    }

    if (HttpRequester.isJSONRpcFormat(data)) {
      return data;
    }

    return this.serverFail(id);
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

    return RPCFabric.createError({
      id,
      code: response.status,
      error: new Error(message),
    });
  }

  /**
   * @param {object} sendData
   * @return {Promise<*>}
   */
  async post(sendData) {
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
