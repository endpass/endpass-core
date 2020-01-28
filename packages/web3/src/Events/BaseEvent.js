export default class BaseEvent {
  static eventName = 'not_defined_event';

  constructor({ context }) {
    this.context = context;

    this.callbacksMap = {
      // hash: [
      //   {
      //     cb: [],
      //     data: {},
      //   },
      // ],
    };
  }

  forEachHash(cb) {
    Object.keys(this.callbacksMap).forEach(hash => {
      cb(hash);
    });
  }

  onReceiveSuccess(hash, passData) {
    this.onReceiveValue(hash, false, passData);
  }

  onReceiveError(hash, error) {
    this.onReceiveValue(hash, error);
  }

  /**
   * @private
   * @param {string} hash
   * @param {Boolean|Error} error
   * @param {any} passData
   */
  onReceiveValue(hash, error = false, passData) {
    const callbacks = this.callbacksMap[hash];
    if (!callbacks) {
      return;
    }
    callbacks.forEach(({ cb }) => {
      cb(error, passData);
    });
  }

  async on(data, cb) {
    if (typeof data === 'function') {
      // eslint-disable-next-line no-param-reassign
      cb = data;
      // eslint-disable-next-line no-param-reassign
      data = 'shared-hash';
    }
    const { callbacksMap } = this;
    const haveCallbacks = Object.keys(callbacksMap).length !== 0;

    const hash = this.getHash(data);
    callbacksMap[hash] = callbacksMap[hash] || [];

    callbacksMap[hash].push({
      cb,
      data,
    });

    if (!haveCallbacks) {
      await this.createCallbacks(data);
    }
    await this.handleData(data);
  }

  off(userCb) {
    const { callbacksMap } = this;
    if (!userCb) {
      this.callbacksMap = {};
      this.releaseCallbacks();
      return;
    }

    Object.keys(callbacksMap).forEach(hashKey => {
      const hashCallbacks = callbacksMap[hashKey];
      const pos = hashCallbacks.findIndex(item => item.cb === userCb);
      if (pos >= 0) {
        hashCallbacks.splice(pos, 1);
      }

      if (hashCallbacks.length === 0) {
        delete callbacksMap[hashKey];
      }
    });

    if (Object.keys(callbacksMap).length === 0) {
      this.releaseCallbacks();
    }
  }

  getHash(data) {
    return data;
  }

  handleData() {}

  createCallbacks() {}

  releaseCallbacks() {}
}
