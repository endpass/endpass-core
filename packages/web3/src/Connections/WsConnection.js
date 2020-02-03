// @ts-check
import BaseConnection from './BaseConnection';

const RECONNECT_TIMEOUT = 5 * 1000; // 5 sec

export default class WsConnection extends BaseConnection {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
    this.ws = null;
    this.isReady = false;
    this.isDestroyed = false;
    this.reconnectTimerId = undefined;
  }

  /**
   * @private
   * @param {number} timeout
   * @return {Promise<void>}
   */
  initWebSocket(timeout = 0) {
    this.isReady = false;
    window.clearTimeout(this.reconnectTimerId);
    // TODO: change flow for calling `createPromise` and then `createTimeout`
    this.resolvePromise = new Promise((resolve, reject) => {
      this.reconnectTimerId = window.setTimeout(() => {
        if (!this.isDestroyed) {
          this.createNativeWS(resolve);
          return;
        }
        reject(new Error('Websocket closed connection after destroy'));
      }, timeout);
    });
    return this.resolvePromise;
  }

  /**
   * @private
   */
  reconnect() {
    this.initWebSocket(RECONNECT_TIMEOUT);
  }

  /**
   * @private
   * @param {Function} handleCreate
   */
  createNativeWS(handleCreate) {
    const ws = new window.WebSocket(this.url);
    this.ws = ws;
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      this.isReady = true;
      handleCreate();
    };
    ws.onclose = () => {
      this.reconnect();
    };
    ws.onmessage = ({ data }) => {
      try {
        const object = JSON.parse(data);
        if (object.id) {
          // :TODO rethink about detect event and request
          this.handleRequest(object);
        } else {
          this.handleSubscriptionEvent(object);
        }
        // console.log('-- e.data-parsed', object);
      } catch (e) {
        console.error(e);
      }
    };
  }

  /**
   * @param {object} data
   * @return {Promise<void>}
   */
  async send(data) {
    if (!this.isReady) {
      await this.resolvePromise;
    }

    if (!this.ws) {
      throw new Error('WebSocket is not init, something goes wrong');
    }

    const str = JSON.stringify(data);

    this.ws.send(str);
  }

  /**
   * @return {Promise<void>}
   */
  async create() {
    if (this.isReady) {
      return this.resolvePromise;
    }

    return this.initWebSocket();
  }

  destroy() {
    // TODO: add reject pending requests, that's why we can't destroy WS
    this.isDestroyed = true;
  }
}
