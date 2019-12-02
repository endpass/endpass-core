import Subscribers from './Subscribers';
import NotifyHandler from '@/NotifyHandler';

const generateId = () => {
  return `d${(+new Date()).toString(16)}-r${(Math.random() * 1e8).toString(
    16,
  )}`;
};

export default class EthSubscription {
  constructor({ requester }) {
    this.requester = requester;
    this.paramsInstancesMap = {};
    this.notify = new NotifyHandler();
  }

  subscribe(cb) {
    this.notify.subscribe(cb);
  }

  /**
   * @private
   */
  notifyObservers = (subscriptionName, result) => {
    if (!this.paramsInstancesMap[subscriptionName]) {
      return;
    }

    // TODO: create RPC response object and return data for each id
    this.paramsInstancesMap[subscriptionName].ids.forEach(subscribeId => {
      const notifyData = {
        jsonrpc: '2.0',
        method: 'eth_subscription',
        params: {
          result,
          subscription: subscribeId,
        },
      };
      this.notify.handleObservers(notifyData);
    });
  };

  createParamSubscription(subscriptionName, optional) {
    const props = {
      requester: this.requester,
    };
    const instance = Subscribers.create(subscriptionName, props, optional);
    instance.subscribe(this.notifyObservers);
  }

  create(params) {
    const id = generateId();
    const [subscriptionName, optional] = params;

    const subscriptionData = this.paramsInstancesMap[subscriptionName] || {
      instance: this.createParamSubscription(subscriptionName, optional),
      ids: [],
    };
    subscriptionData.ids.push(id);

    this.paramsInstancesMap[subscriptionName] = subscriptionData;

    return id;
  }

  remove(params) {
    const [id] = params;
    Object.keys(this.paramsInstancesMap).forEach(subscriptionName => {
      const subscriptionData = this.paramsInstancesMap[subscriptionName];

      subscriptionData.ids = subscriptionData.ids.filter(
        storedId => storedId !== id,
      );

      if (subscriptionData.ids.length === 0) {
        subscriptionData.instance.destroy();
        delete this.paramsInstancesMap[subscriptionName];
      }
    });
  }

  destroy() {
    Object.keys(this.paramsInstancesMap).forEach(id => {
      this.paramsInstancesMap[id].destroy();
    });
    this.notify.destroy();
  }
}
