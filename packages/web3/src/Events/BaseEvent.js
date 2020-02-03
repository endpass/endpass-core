export default class BaseEvent {
  static eventName = 'not_defined_event';

  constructor({ context }) {
    this.context = context;

    /** @type {EventHashMap} */
    this.eventsHashMap = {};
  }

  forEachHash(cb) {
    Object.keys(this.eventsHashMap).forEach(hash => {
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
    const eventHashList = this.eventsHashMap[hash];
    if (!eventHashList) {
      return;
    }
    eventHashList.forEach(({ cb }) => {
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
    const { eventsHashMap } = this;
    const isEmpty = Object.keys(eventsHashMap).length === 0;

    const hash = this.getHash(data);
    eventsHashMap[hash] = eventsHashMap[hash] || [];

    eventsHashMap[hash].push({
      cb,
      data,
    });

    if (isEmpty) {
      await this.createCallbacks(data);
    }
    await this.handleData(data);
  }

  off(userCb) {
    const { eventsHashMap } = this;
    if (!userCb) {
      this.eventsHashMap = {};
      this.releaseCallbacks();
      return;
    }

    Object.keys(eventsHashMap).forEach(hashKey => {
      const eventHashList = eventsHashMap[hashKey];
      const pos = eventHashList.findIndex(item => item.cb === userCb);
      if (pos >= 0) {
        eventHashList.splice(pos, 1);
      }

      if (eventHashList.length === 0) {
        delete eventsHashMap[hashKey];
      }
    });

    if (Object.keys(eventsHashMap).length === 0) {
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
