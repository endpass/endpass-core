import CompositePlugin from '@/plugins/Composite';

import Web3ResponseFabric from '@/class/Web3ResponseFabric';
import { promiseRepeater, promiseToIterator, sleep } from '@/class/generators';

export default class Web3Core {
  constructor({ netUrl, plugins = [] }) {
    this.netUrl = '';
    this.plugins = plugins;

    this.initNetworkChange();
    this.setNetwork(netUrl);
  }

  setNetwork(netUrl) {
    if (this.netUrl === netUrl) {
      return this.core;
    }

    this.netUrl = netUrl;

    this.networkChangeResolve({ isNetworkChanged: true });
    this.initNetworkChange();
    if (this.core) this.core.destroy();

    // TODO: think about how to remove Context creation (cycle links detected)
    this.core = new CompositePlugin({
      netUrl,
      plugins: this.plugins,
    });

    return this.core;
  }

  /**
   * @private
   */
  initNetworkChange() {
    this.networkChangePromise = new Promise(resolve => {
      this.networkChangeResolve = resolve;
    });
  }

  call(...args) {
    return this.core.call(...args);
  }

  async isNetworkChanged() {
    // TODO: replace to callbag
    return this.networkChangePromise;
  }

  async toRace(promiseRequest) {
    // TODO: replace to callbag
    try {
      const res = await Promise.race([promiseRequest, this.isNetworkChanged()]);
      return Web3ResponseFabric.createSuccess(res);
    } catch (e) {
      return Web3ResponseFabric.createError(e);
    }
  }

  emitterToIterator(method, props) {
    // TODO: think about naming of this method
    // TODO: replace to callbag
    const repeater = promiseRepeater();

    const emitterHandler = (error, result) => {
      repeater.resolve(Web3ResponseFabric.createResponse(result, error));
    };

    const unsubscribe = this.core.on(method, props, emitterHandler);

    return promiseToIterator({
      promise: () =>
        Promise.race([repeater.promise(), this.isNetworkChanged()]),
      release: unsubscribe,
    });
  }

  timeoutToIterator(ms) {
    // TODO: think about naming of this method
    // TODO: replace to callbag
    return promiseToIterator({
      promise: () => Promise.race([sleep(ms), this.isNetworkChanged()]),
    });
  }

  destroy() {
    // TODO: add stop iterators
    if (this.core) this.core.destroy();
  }
}
