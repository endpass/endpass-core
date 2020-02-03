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
      /**
       * @param {any} data
       */
      handleSubscriptionEvent: data => {
        this.handleSubscriptionEvent(data);
      },
    });
  }

  /**
   * @private
   * @param {object} object
   * @return {Promise<void>}
   */
  async doRequest(object) {
    const data = await this.requester.send(object);

    // send data to provider
    this.handleRequest(data);
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
    this.handleRequest(res);
  }

  /**
   * @param {object} object
   */
  async send(object) {
    const { method, params, error } = object;

    if (error) {
      //   if HTTP error, all processed in HttpRequester
      //   TODO: add processing for WS errors and check connection error of WS
      //   create Error object and return to rpc
      //   this.answerRpc(object);
      //   return;
    }

    switch (method) {
      case 'eth_subscribe':
        this.answerRpc(object, this.ethSubscription.create(params));
        break;
      case 'eth_unsubscribe':
        this.ethSubscription.remove(params);
        this.answerRpc(object);
        break;
      default:
        this.doRequest(object);
        break;
    }

    // TODO: add handle other subscription methods from ETH
  }

  destroy() {
    this.ethSubscription.destroy();
  }
}
