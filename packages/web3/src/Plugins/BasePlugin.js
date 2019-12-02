import Context from '@/Context';

export default class BasePlugin {
  static pluginName = 'not_defined_plugin';

  static Events = [];

  constructor(props) {
    const { context, netUrl } = props;
    this.netUrl = netUrl;
    this.context = context || new Context(props);

    this.context.events.addEvents(this.constructor.Events, props);
  }

  /**
   * @param {string} method
   * @param {object} data
   * @param {Function} cb
   */
  on(method, data, cb) {
    this.context.events.on(method, data, cb);
  }

  /**
   * @param {string} method
   * @param {Function} cb
   */
  off(method, cb) {
    this.context.events.off(method, cb);
  }

  /**
   * @param {string} method
   * @param {Array} args
   * @return {Promise<any>}
   */
  call(method, ...args) {
    return this.context.provider.callMethod(method, ...args);
  }
}
