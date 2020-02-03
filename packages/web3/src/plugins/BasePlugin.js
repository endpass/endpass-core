import Context from '@/Context';

export default class BasePlugin {
  static pluginName = 'not_defined_plugin';

  static Events = [];

  constructor(props) {
    const { context } = props;
    this.context = context || new Context(props);
  }

  /**
   * @param {string} method
   * @param {object} data
   * @param {Function} cb
   */
  on(method, data, cb) {
    return this.context.events.on(method, data, cb);
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

  destroy() {
    this.context.destroy();
  }
}
