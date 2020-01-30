// @ts-check
import NotifyHandler from '@/class/NotifyHandler';

export default class BaseConnection {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
    this.eventNotify = new NotifyHandler();
    this.requestNotify = new NotifyHandler();
  }

  /**
   * @param {any} data
   */
  handleEvent = data => {
    this.eventNotify.handleObservers(data);
  };

  /**
   * @param {any} data
   */
  handleRequest = data => {
    this.requestNotify.handleObservers(data);
  };

  /**
   * @param {Function} cb
   */
  subscribeEvent(cb) {
    this.eventNotify.subscribe(cb);
  }

  /**
   * @param {Function} cb
   */
  subscribeRequest(cb) {
    this.requestNotify.subscribe(cb);
  }

  /**
   * @param {object} str
   * @return {void}
   */
  send = str => {
    throw new Error(
      `Send method is not implemented, data '${str}' will not be send`,
    );
  };

  create() {}
}
