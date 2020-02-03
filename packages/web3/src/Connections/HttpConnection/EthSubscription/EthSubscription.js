import SubscriptionsFactory from './subscriptions';
import RPCFactory from '@/class/RPCFactory';

/**
 * generate unique string
 * @return {string}
 */
const generateId = () =>
  `d${(+new Date()).toString(16)}-r${(Math.random() * 1e8).toString(16)}`;

export default class EthSubscription {
  /**
   * @param {object} requester
   */
  constructor({ requester, handleSubscriptionEvent }) {
    this.requester = requester;
    this.subscriptions = {};
    this.handleSubscriptionEvent = handleSubscriptionEvent;
  }

  /**
   * @private
   * @param {string} subscriptionName
   * @param {object} result
   */
  notifyObservers = (subscriptionName, result) => {
    if (!this.subscriptions[subscriptionName]) {
      return;
    }

    this.subscriptions[subscriptionName].ids.forEach(subscribeId => {
      const notifyData = RPCFactory.createEventAnswer({
        method: 'eth_subscription',
        params: {
          result,
          subscription: subscribeId,
        },
      });
      this.handleSubscriptionEvent(notifyData);
    });
  };

  /**
   * @private
   * @param {string} subscriptionName
   * @param {?} options
   */
  createSubscription(subscriptionName, options) {
    const props = {
      requester: this.requester,
    };
    const instance = SubscriptionsFactory.create(
      subscriptionName,
      props,
      options,
    );
    instance.subscribe(this.notifyObservers);
    return instance;
  }

  /**
   * @param {Array<string, any>} params
   * @return {string}
   */
  create(params) {
    const id = generateId();
    const [subscriptionName, options] = params;

    const subscriptionData = this.subscriptions[subscriptionName] || {
      instance: this.createSubscription(subscriptionName, options),
      ids: [],
    };
    subscriptionData.ids.push(id);

    this.subscriptions[subscriptionName] = subscriptionData;

    return id;
  }

  /**
   * @param {Array<string>} params
   */
  remove(params) {
    const [id] = params;
    Object.keys(this.subscriptions).forEach(subscriptionName => {
      const subscriptionData = this.subscriptions[subscriptionName];

      subscriptionData.ids = subscriptionData.ids.filter(
        storedId => storedId !== id,
      );

      if (subscriptionData.ids.length === 0) {
        subscriptionData.instance.destroy();
        delete this.subscriptions[subscriptionName];
      }
    });
  }

  destroy() {
    Object.keys(this.subscriptions).forEach(id => {
      this.subscriptions[id].instance.destroy();
    });
  }
}
