export default class BaseEvent {
  static eventName = 'not_defined_event';

  constructor({ context }) {
    this.context = context;

    /** @type {EventHashMap} */
    this.hashMap = {};
  }

  forEachHash(cb) {
    Object.keys(this.hashMap).forEach(hash => {
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
    const eventHashList = this.hashMap[hash];
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
    const { hashMap } = this;
    const isEmpty = Object.keys(hashMap).length === 0;

    const hash = this.getHash(data);
    hashMap[hash] = hashMap[hash] || [];

    hashMap[hash].push({
      cb,
      data,
    });

    if (isEmpty) {
      await this.createCallbacks(data);
    }
    await this.handleData(data);
  }

  off(userCb) {
    const { hashMap } = this;
    if (!userCb) {
      this.hashMap = {};
      this.releaseCallbacks();
      return;
    }

    Object.keys(hashMap).forEach(hashKey => {
      const eventHashList = hashMap[hashKey];
      const pos = eventHashList.findIndex(item => item.cb === userCb);
      if (pos >= 0) {
        eventHashList.splice(pos, 1);
      }

      if (eventHashList.length === 0) {
        delete hashMap[hashKey];
      }
    });

    if (Object.keys(hashMap).length === 0) {
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
