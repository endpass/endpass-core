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
    const { messageType, method, payload } = msg.data;

    if (
      messageType !== MESSAGE_TYPE
      || !this.broadcastMethods.includes(method)
    ) {
      return;
    }

    this.send(method, payload);
  }

  /**
   * Makes broadcasting of given message to all messengers in context
   * @param {String} method Message method
   * @param {Object} data Message payload
   */
  send(method, payload) {
    if (this.messengers.length === 0) return;

    this.messengers.forEach((messenger) => {
      if (!messenger.send && !(messenger.send instanceof Function)) return;

      messenger.send(method, payload);
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
