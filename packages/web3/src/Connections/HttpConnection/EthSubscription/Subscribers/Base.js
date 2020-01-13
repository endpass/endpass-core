import NotifyHandler from '@/NotifyHandler';

export default class Base {
  static paramName = 'notDefined';

  /**
   *
   * @param {} requester
   */
  constructor({ requester }) {
    this.requester = requester;
    this.notify = new NotifyHandler();
  }

  subscribe(cb) {
    this.notify.subscribe(cb);
  }

  handleObservers(data) {
    this.notify.handleObservers(this.constructor.paramName, data);
  }

  destroy() {
    this.notify.destroy();
  }
}
