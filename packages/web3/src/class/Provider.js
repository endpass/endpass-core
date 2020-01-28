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
    this.subscribeTransport();
  }

  /**
   * @private
   */
  subscribeTransport() {
    // incoming event data
    this.connection.subscribe(this.onMessage);

    // send data
    this.rpc.on('data', this.connection.send);
  }

  /**
   * @private
   * @param {object} data
   */
  onMessage = data => {
    // TODO: try to rethink about how to split for GET and EVENT flows
    if (data.id) {
      // GET/POST request
      // receive data from .callMethod
      this.rpc.write(data);
    } else {
      // EVENT from server
      // subscription receive
      this.notify.handleObservers(data);
    }
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
   * @param {string} method
   * @param {[]} args
   * @return {Promise<any>}
   */
  async callMethod(method, ...args) {
    await this.connection.create();

    try {
      const res = await this.rpc.call(method, ...args);
      return res;
    } catch (rpcError) {
      throw new Error(rpcError.wrapped);
    }
  }

  destroy() {
    this.unsubscribe();
    this.connection.destroy();
  }
}
