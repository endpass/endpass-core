// @ts-check
import NotifyHandler from '@/NotifyHandler';

export default class BaseConnection {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
    this.notify = new NotifyHandler();
  }

  /**
   * @param {any} data
   */
  handleObservers = data => {
    this.notify.handleObservers(data);
  };

  /**
   * @param {Function} cb
   */
  subscribe(cb) {
    this.notify.subscribe(cb);
  }

  /**
   * @param {Function=} cb
   */
  unsubscribe(cb) {
    this.notify.unsubscribe(cb);
  }

  /**
   * @param {string} str
   * @return {void}
   */
  send = str => {
    throw new Error(
      `Send method is not implemented, data '${str}' will not be send`,
    );
  };

  create() {}

  destroy() {
    this.notify.destroy();
  }
}
