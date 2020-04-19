// @ts-check

export default class DataEventSource {
  /**
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
    /** @type {Function[]} */
    this.handlers = [];
    this.eventSource = null;
  }

  /**
   * @private
   */
  start() {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(this.url, {
      withCredentials: true,
    });
    this.eventSource.addEventListener('message', this.handleEvent);
  }

  /**
   * @private
   */
  stop() {
    if (!this.eventSource) {
      return;
    }

    this.eventSource.removeEventListener('message', this.handleEvent);
    this.eventSource.close();
    this.eventSource = null;
  }

  /**
   * @private
   * @param {MessageEvent} data
   */
  handleEvent = data => {
    this.handlers.forEach(handler => handler(data));
  };

  /**
   * @param {Function} handler
   */
  addHandler = handler => {
    this.handlers.push(handler);
    this.start();
  };

  /**
   * @param {Function} handler
   */
  removeHandler = handler => {
    const handlerIdx = this.handlers.indexOf(handler);
    if (handlerIdx !== -1) {
      this.handlers.splice(handlerIdx, 1);
    }

    if (this.handlers.length === 0) {
      this.stop();
    }
  };
}
