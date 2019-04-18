const MESSAGE_TYPE = 'endpass-cw-msgr';

export const privateMethods = {
  setupMessagesListener: Symbol('setupMessagesListener'),
  sendBroadcastMessage: Symbol('sendBroadcastMessage'),
  onReceiveMessage: Symbol('onReceiveMessage'),
};

export default class CrossWindowBroadcaster {
  /**
   * @param {String} props.method Broadcase message method
   */
  constructor(props = {}) {
    if (!props.method) {
      throw new Error('You must provide broadcast method!');
    }

    this.broadcastMethods = [].concat(props.method);
    this.bus = props.bus || window;
    this.messengers = [];

    this[privateMethods.setupMessagesListener]();
  }

  /**
   * Sets up bus message event listener
   */
  [privateMethods.setupMessagesListener]() {
    this.bus.addEventListener(
      'message',
      this[privateMethods.onReceiveMessage].bind(this),
    );
  }

  /**
   * Handle broadcase messages and resend it to all messengers in context
   * @param {Event} msg Message event object
   */
  [privateMethods.onReceiveMessage](msg) {
    const { messageType, method } = msg.data;

    if (messageType !== MESSAGE_TYPE || !this.broadcastMethods.includes(method))
      return;

    this[privateMethods.sendBroadcastMessage](msg.data);
  }

  /**
   * Makes broadcasting of given message to all messengers in context
   * @param {Object} data Message Event payload
   */
  [privateMethods.sendBroadcastMessage](data) {
    if (this.messengers.length === 0) return;

    this.messengers.forEach(messenger => {
      if (!messenger.send && !(messenger.send instanceof Function)) return;

      messenger.send(data.method, data);
    });
  }

  /**
   * Add messenger to context
   * @param {CrossWindowMessenger} messenger Endpass messenger
   */
  pushMessengers(messenger) {
    this.messengers.push(...[].concat(messenger));
  }
}
