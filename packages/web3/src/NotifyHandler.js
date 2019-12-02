// @ts-check

export default class NotifyHandler {
  constructor() {
    /** @type {Function[]} */
    this.callbacks = [];
  }

  /**
   * @param {any} args
   */
  handleObservers(...args) {
    this.callbacks.forEach(cb => cb(...args));
  }

  /**
   * @param {Function} cb
   */
  subscribe(cb) {
    this.callbacks.push(cb);
  }

  /**
   * @param {Function=} cb
   */
  unsubscribe(cb) {
    if (!cb) {
      this.callbacks = [];
      return;
    }

    const pos = this.callbacks.indexOf(cb);
    if (pos >= 0) {
      this.callbacks.splice(pos, 1);
    }
  }

  destroy() {
    this.callbacks = [];
  }
}
