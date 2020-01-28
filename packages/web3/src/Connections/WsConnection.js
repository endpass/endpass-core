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
   * @param {Function} onCreate
   */
  createNativeWS(onCreate) {
    const ws = new window.WebSocket(this.url);
    this.ws = ws;
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      this.isReady = true;
      onCreate();
    };
    ws.onclose = () => {
      this.reconnect();
    };
    ws.onmessage = ({ data }) => {
      try {
        const object = JSON.parse(data);
        this.handleObservers(object);
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
  async sendViaWs(data) {
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
   * @param {object} data
   * @return {void}
   */
  send = data => {
    this.sendViaWs(data);
  };

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
    this.isDestroyed = true;
  }
}
