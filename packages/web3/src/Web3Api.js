import CompositePlugin from '@/Plugins/Composite';

import web3Response from '@/Extended/Web3Response';
import {
  promiseRepeater,
  promiseToIterator,
  sleep,
} from '@/Extended/generators';

export default class Web3Api {
  constructor({ netUrl, plugins }) {
    this.setNetworkResolver();
    this.setNetwork(netUrl);
    this.netUrl = netUrl;
    this.plugins = plugins;
  }

  setNetwork(netUrl) {
    if (this.netUrl === netUrl) {
      return this.core;
    }

    this.netUrl = netUrl;

    // create new instance of core
    this.networkChangeResolve({ isNetworkChanged: true });
    this.setNetworkResolver();
    // if (this.core) this.core.destroy();
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
    // TODO: replace by callbag
    return this.networkChangePromise;
  }

  async toRace(promiseRequest) {
    // TODO: replace by callbag
    try {
      const res = await Promise.race([promiseRequest, this.isNetworkChanged()]);
      return web3Response.createSuccess(res);
    } catch (e) {
      return web3Response.createError(e, false);
    }
  }

  emitterToIterator(method, props) {
    // TODO: replace by callbag
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
    // TODO: replace by callbag
    return promiseToIterator({
      promise: () => Promise.race([sleep(ms), this.isNetworkChanged()]),
    });
  }
}
