const MESSAGE_TYPE = 'endpass-cw-msgr';
const ALL_METHODS = `-${MESSAGE_TYPE}-all-methods`;

const privateMethods = {
  onReceiveMessage: Symbol('onReceiveMessage'),
  sendOutside: Symbol('sendOutside'),
  onAction: Symbol('onAction'),
  offAction: Symbol('offAction'),
};

export default class CrossWindowMessenger {
  /**
   * @param {String} props.to To direction of send messages
   * @param {String} props.from From direction of receive messages
   * @param {Window} [props.target] target object for messages
   * @param {String} [props.name] name of current messenger
   * @param {Boolean} [props.showLogs] show logs for debug
   * @param {Object} [props.bus] bus for events
   */
  constructor(props = {}) {
    if (!props.to || !props.from) {
      throw new Error('You must provide direction property');
    }
    if (props.to === props.from) {
      throw new Error('Directions must be not equal');
    }
    this.name = props.name;
    this.target = props.target;
    this.directionFrom = `${MESSAGE_TYPE}-${props.from}`;
    this.directionTo = `${MESSAGE_TYPE}-${props.to}`;
    this.showLogs = props.showLogs;
    this.actions = [];

    this[privateMethods.onReceiveMessage] = this[
      privateMethods.onReceiveMessage
    ].bind(this);

    this.bus = props.bus || window;

    this.bus.addEventListener('message', this[privateMethods.onReceiveMessage]);
  }

  /**
   * Receive event from other window and prepare answer
   * @param ev Event from window.postMessage emitter
   */
  [privateMethods.onReceiveMessage](ev) {
    const { source, data = {} } = ev;
    if (
      data.messageType !== MESSAGE_TYPE ||
      data.to !== this.directionFrom ||
      this.target !== source
    ) {
      return;
    }
    if (this.showLogs) {
      // eslint-disable-next-line
      console.log(
        '-- CrossWindowMessenger.onReceiveMessage()',
        this.name,
        data,
      );
    }
    const { payload, from, to, method } = data;

    const req = {
      source,
      method,
      answer: result => {
        this[privateMethods.sendOutside]({
          target: source,
          method,
          to: from,
          from: to,
          payload: result,
        });
      },
    };

    this.actions.forEach(action => {
      const { method: actionMethod, cb } = action;
      if (actionMethod === method || actionMethod === ALL_METHODS) {
        cb(payload, req);
      }
    });
  }

  /**
   * Send message to target
   * @param {String} props.to To direction of send messages
   * @param {String} props.from From direction of receive messages
   * @param {Window} props.target target object for messages
   * @param {String} props.method method what method need to be call
   * @param {Object} [props.payload] payload send data
   */
  [privateMethods.sendOutside](props) {
    if (this.showLogs) {
      // eslint-disable-next-line
      console.log('-- CrossWindowMessenger().sendOutside', this.name, props);
    }

    if (!props.target) {
      throw new Error('You must provide message target!');
    }

    if (!props.to) {
      throw new Error('You must provide "to" destination');
    }

    if (!props.from) {
      throw new Error('You must provide "from" destination');
    }

    if (!props.method) {
      throw new Error('You must provide "method"');
    }

    props.target.postMessage(
      {
        messageType: MESSAGE_TYPE,
        to: props.to,
        from: props.from,
        method: props.method,
        payload: props.payload,
      },
      '*',
    );
  }

  /**
   * Bind actions for process messages from outside
   * @param {String|Array} method for bind actions
   * @param {Function} cb callback
   */
  [privateMethods.onAction](method, cb) {
    const methodList = [].concat(method);

    methodList.forEach(item => {
      this.actions.push({
        method: item,
        cb,
      });
    });
  }

  /**
   * Off action by callback link
   * @param {Function} cb callback
   */
  [privateMethods.offAction](cb) {
    this.actions = this.actions.filter(action => action.cb !== cb);
  }

  /**
   * Define target for send messages
   * @param {Object} target
   */
  setTarget(target) {
    this.target = target;
  }

  /**
   * Wait answer for special method
   *
   * @param {String} method method for await process
   * @param {any} [payload] send payload data
   * @returns {Promise<any>}
   */
  async sendAndWaitResponse(method, payload) {
    if (!this.target) {
      throw new Error('Target is not defined to send message!');
    }

    const result = new Promise(resolve => {
      // TODO: add timeout here ?

      const handler = (data, req) => {
        if (this.showLogs) {
          // eslint-disable-next-line
          console.log(
            '-- CrossWindowMessenger.sendAndWaitResponse() -> handler callback',
            this.name,
            data,
            req,
          );
        }
        this[privateMethods.offAction](handler);
        resolve(data);
      };
      this[privateMethods.onAction](method, handler);
    });

    this.send(method, payload);

    return result;
  }

  /**
   * Subscribe to special method for answer
   * @param {String | Function} method
   * @param {Function} cb callback
   * @return {Function} disposer
   */
  subscribe(method, cb) {
    if (typeof method === 'function') {
      // eslint-disable-next-line
      cb = method;
      // eslint-disable-next-line
      method = ALL_METHODS;
    }
    this[privateMethods.onAction](method, cb);
    return () => this.unsubscribe(cb);
  }

  /**
   * Remove callback from method subscription
   * @param {Function} cb callback
   */
  unsubscribe(cb) {
    this[privateMethods.offAction](cb);
  }

  /**
   * Send data to target
   * @param {String} method
   * @param {{}} payload
   */
  send(method, payload) {
    this[privateMethods.sendOutside]({
      target: this.target,
      to: this.directionTo,
      from: this.directionFrom,
      method,
      payload,
    });
  }

  /**
   * Destroy and clean state of messenger
   */
  destroy() {
    this.bus.removeEventListener(
      'message',
      this[privateMethods.onReceiveMessage],
    );
    this.actions.length = 0;
    this.target = null;
  }
}
