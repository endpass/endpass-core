// @ts-check
import JSONBird from 'jsonbird';
import ConnectionFactory from '@/Connections/ConnectionFactory';
import NotifyHandler from '@/class/NotifyHandler';

export default class Provider {
  /**
   * @param {string=} netUrl
   */
  constructor(netUrl) {
    this.notify = new NotifyHandler();
    this.rpc = new JSONBird({
      readableMode: 'object',
      writableMode: 'object',
    });

    this.connection = ConnectionFactory.create(netUrl);
    this.initTransport();
  }

  /**
   * @private
   */
  initTransport() {
    // incoming event data
    this.connection.subscribeEvent(this.onEvent);

    // send data
    this.connection.subscribeRequest(this.onRequest);
    this.rpc.on(
      'data',
      /**
       * @param {any} data
       */
      data => {
        this.connection.send(data);
      },
    );
  }

  /**
   * @private
   * @param {object} data
   */
  onEvent = data => {
    // EVENT from server
    // subscription receive
    this.notify.handleObservers(data);
  };

  /**
   * @private
   * @param {object} data
   */
  onRequest = data => {
    // GET/POST request
    // receive data from .callMethod
    this.rpc.write(data);
  };

  /**
   * @param {Function} cb
   */
  subscribe(cb) {
    this.notify.subscribe(cb);
  }

  /**
   * @param {Function} cb
   */
  unsubscribe(cb) {
    this.notify.unsubscribe(cb);
  }

  /**
   * @param {string} method
   * @param {[]} args
   * @return {Promise<any>}
   */
  async callMethod(method, ...args) {
    await this.connection.create();

    try {
      const data = await this.rpc.call(method, ...args);
      return data;
    } catch (rpcError) {
      throw rpcError.wrapped;
    }
  }

  destroy() {
    this.connection.destroy();
  }
}
