import Subscribers from './Subscribers';
import NotifyHandler from '@/class/NotifyHandler';
import RPCFabric from '@/class/RPCFabric';

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
  constructor({ requester }) {
    this.requester = requester;
    this.subscriptions = {};
    this.notify = new NotifyHandler();
  }

  /**
   * @param {Function} cb
   */
  subscribe(cb) {
    this.notify.subscribe(cb);
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
      const notifyData = RPCFabric.createEventAnswer({
        method: 'eth_subscription',
        params: {
          result,
          subscription: subscribeId,
        },
      });
      this.notify.handleObservers(notifyData);
    });
  };

  /**
   * @private
   * @param {string} subscriptionName
   * @param {?} optional
   */
  createParamSubscription(subscriptionName, optional) {
    const props = {
      requester: this.requester,
    };
    const instance = Subscribers.create(subscriptionName, props, optional);
    instance.subscribe(this.notifyObservers);
    return instance;
  }

  create(params) {
    const id = generateId();
    const [subscriptionName, optional] = params;

    const subscriptionData = this.subscriptions[subscriptionName] || {
      instance: this.createParamSubscription(subscriptionName, optional),
      ids: [],
    };
    subscriptionData.ids.push(id);

    this.subscriptions[subscriptionName] = subscriptionData;

    return id;
  }

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
    this.notify.destroy();
  }
}
