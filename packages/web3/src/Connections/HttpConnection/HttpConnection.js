// @ts-check

import BaseConnection from '../BaseConnection';
import EthSubscription from './EthSubscription';
import HttpRequester from './HttpRequester';

export default class HttpConnection extends BaseConnection {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
    this.requester = new HttpRequester(this.url);
    this.ethSubscription = new EthSubscription({
      requester: this.requester,
    });

    // event data to provider
    this.ethSubscription.subscribe(this.handleObservers);
  }

  /**
   * @private
   * @param {object} object
   * @return {Promise<void>}
   */
  async sendRequest(object) {
    const response = await this.requester.post(object);
    const data = await response.json();

    // send data to provider
    this.handleObservers(data);
  }

  /**
   * @private
   * @param {object} params
   * @param {string} params.id
   * @param {string} params.jsonrpc
   * @param {any=} result
   */
  answerRpc({ id, jsonrpc }, result) {
    const res = {
      id,
      jsonrpc,
      result,
    };
    this.handleObservers(res);
  }

  /**
   * @private
   * @param {object} object
   */
  sendViaHttp(object) {
    const { method, params } = object;

    switch (method) {
      case 'eth_subscribe':
        this.answerRpc(object, this.ethSubscription.create(params));
        break;
      case 'eth_unsubscribe':
        this.ethSubscription.remove(params);
        this.answerRpc(object);
        break;
      default:
        this.sendRequest(object);
        break;
    }

    // // TODO: add realisation for newHeads as `eth_getBlockByNumber` with 'latest'
    // // TODO: add get data blocks from eth ?
  }

  /**
   * @param {object} data
   */
  send = data => {
    this.sendViaHttp(data);
  };

  destroy() {
    super.destroy();
    this.ethSubscription.destroy();
  }
}
