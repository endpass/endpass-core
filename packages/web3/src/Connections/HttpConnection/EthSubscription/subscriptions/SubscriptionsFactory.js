import NewHeads from './NewHeads';

const subscriptionsClassMap = {
  [NewHeads.paramName]: NewHeads,
};

export default class SubscriptionsFactory {
  /**
   * @param {string} subscriptionName
   * @param {object} props
   * @param {?} options
   * @return {NewHeads}
   */
  static create(subscriptionName, props, options) {
    if (!subscriptionsClassMap[subscriptionName]) {
      throw new Error(
        `Not defined emulator for 'eth_subscribe' by '${subscriptionName}'`,
      );
    }
    const SubscriptionClass = subscriptionsClassMap[subscriptionName];
    return new SubscriptionClass(props, options);
  }
}
