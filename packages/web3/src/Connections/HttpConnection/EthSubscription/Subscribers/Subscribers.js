import NewHeads from './NewHeads';

const subscribersMap = {
  [NewHeads.paramName]: NewHeads,
};

export default class Subscribers {
  /**
   * @param {string} subscriptionName
   * @param {object} props
   * @param {?} optional
   * @return {NewHeads}
   */
  static create(subscriptionName, props, optional) {
    if (!subscribersMap[subscriptionName]) {
      throw new Error(
        `Not defined emulator for 'eth_subscribe' with arguments '${subscriptionName}'`,
      );
    }
    const SubscriptionClass = subscribersMap[subscriptionName];
    return new SubscriptionClass(props, optional);
  }
}
