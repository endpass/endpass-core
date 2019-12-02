import BaseConnection from '../BaseConnection';
import EthSubscription from './EthSubscription';
import HttpRequester from './HttpRequester';

export default class HttpConnection extends BaseConnection {
  constructor(props) {
    super(props);
    this.requester = new HttpRequester(this.url);
    this.ethSubscription = new EthSubscription({
      requester: this.requester,
    });

    // event data to provider
    this.ethSubscription.subscribe(this.handleObservers);
  }

  async sendRequest(object) {
    return this.requester.call(object);
  }

  async handleGetData(object) {
    const response = await this.sendRequest(object);
    const data = await response.json();

    // send data to provider
    this.handleObservers(data);
  }

  answerRpc({ id, jsonrpc }, result) {
    const res = {
      id,
      jsonrpc,
      result,
    };
    this.handleObservers(res);
  }

  async sendViaHttp(object) {
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
        this.handleGetData(object);
        break;
    }

    // // TODO: add realisation for newHeads as `eth_getBlockByNumber` with 'latest'
    // // TODO: add get data blocks from eth ?
  }

  send = object => {
    this.sendViaHttp(object);
  };

  destroy() {
    super.destroy();
    this.ethSubscription.destroy();
  }
}
