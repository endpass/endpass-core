import BaseEvent from '@/Events/BaseEvent';
import { EVENT_PLUGINS } from '@/constants';

const MINIMUM_TIMEOUT = 1000;

export default class BalanceEvent extends BaseEvent {
  static eventName = EVENT_PLUGINS.BALANCE;

  constructor(props) {
    super(props);
    this.requestMap = {};
    this.isSkipping = false;
    this.subscribeId = null;
    this.isSubscribed = false;
  }

  getHash({ address }) {
    return address;
  }

  async createCallbacks() {
    if (this.isSubscribed) {
      return;
    }

    this.isSubscribed = true;

    const subscribeId = await this.context.provider.callMethod(
      'eth_subscribe',
      'newHeads',
    );

    if (this.isSubscribed) {
      this.context.provider.subscribe(this.onMessage);
      this.subscribeId = subscribeId;
    } else {
      await this.context.provider.callMethod('eth_unsubscribe', subscribeId);
    }
  }

  async releaseCallbacks() {
    if (!this.isSubscribed) {
      return;
    }

    this.isSubscribed = false;
    this.context.provider.unsubscribe(this.onMessage);
    const { subscribeId } = this;
    this.subscribeId = null;
    await this.context.provider.callMethod('eth_unsubscribe', subscribeId);
  }

  handleData({ address }) {
    if (this.requestMap[address]) {
      return;
    }
    this.requestMap[address] = true;
    this.getBalance(address)
      .then(balance => {
        delete this.requestMap[address];
        this.onReceiveSuccess(address, balance);
      })
      .catch(error => {
        delete this.requestMap[address];
        this.onReceiveError(address, error);
      });
  }

  holdoutNext() {
    this.isSkipping = true;
    setTimeout(() => {
      this.isSkipping = false;
    }, MINIMUM_TIMEOUT);
  }

  onMessage = ({ params, method }) => {
    if (
      method !== 'eth_subscription' ||
      params.subscription !== this.subscribeId ||
      this.isSkipping
    ) {
      return;
    }

    this.holdoutNext();

    this.forEachHash(address => {
      this.handleData({ address });
    });
  };

  async getBalance(address) {
    return this.context.provider.callMethod(
      'eth_getBalance',
      address,
      'latest',
    );
  }
}
