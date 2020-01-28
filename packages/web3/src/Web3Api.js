import CompositePlugin from '@/plugins/Composite';

import Web3ResponseFabric from '@/class/Web3ResponseFabric';
import { promiseRepeater, promiseToIterator, sleep } from '@/class/generators';

export default class Web3Api {
  constructor({ netUrl, plugins }) {
    this.netUrl = '';
    this.plugins = plugins;
    this.setNetworkResolver();
    this.setNetwork(netUrl);
  }

  setNetwork(netUrl) {
    if (this.netUrl === netUrl) {
      return this.core;
    }

    this.netUrl = netUrl;

    // create new instance of core
    this.networkChangeResolve({ isNetworkChanged: true });
    this.setNetworkResolver();
    if (this.core) this.core.destroy();
    this.core = new CompositePlugin({
      netUrl,
      plugins: this.plugins,
    });

    return this.core;
  }

  setNetworkResolver() {
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
      return Web3ResponseFabric.createError(e, false);
    }
  }

  emitterToIterator(method, props) {
    // TODO: replace to callbag
    const repeater = promiseRepeater();

    const emitterHandler = (error, result) => {
      repeater.resolve({ error, result, isNetworkChanged: false });
    };

    const unsubscribe = this.core.on(method, props, emitterHandler);

    return promiseToIterator({
      promise: () =>
        Promise.race([repeater.promise(), this.isNetworkChanged()]),
      release: unsubscribe,
    });
  }

  timeoutToIterator(ms) {
    // TODO: replace to callbag
    return promiseToIterator({
      promise: () => Promise.race([sleep(ms), this.isNetworkChanged()]),
    });
  }
}
