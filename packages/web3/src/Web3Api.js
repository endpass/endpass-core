import generators from '@endpass/utils/generators';
import BalancePlugin from './Plugins/Balance';
import CompositePlugin from './Plugins/Composite';
import Web3ResponseFabric from './Web3ResponseFabric';

const RECEIPT_STATUS_CONFIRM_TIMEOUT = 2000;

export default class Web3Api {
  constructor({ netUrl }) {
    this.setNetworkResolver();
    this.setNetwork(netUrl);
    this.netUrl = netUrl;
  }

  setNetwork(netUrl) {
    if (this.netUrl === netUrl) {
      return this.web3;
    }

    this.netUrl = netUrl;

    // create new instance of web3
    this.networkChangeResolve({ isNetworkChanged: true });
    this.setNetworkResolver();
    // if (this.web3) this.web3.destroy();
    this.web3 = new CompositePlugin({
      netUrl,
      plugins: [BalancePlugin],
    });

    return this.web3;
  }

  setNetworkResolver() {
    this.networkChangePromise = new Promise(resolve => {
      this.networkChangeResolve = resolve;
    });
  }

  call(...args) {
    return this.web3.call(...args);
  }

  async createRaceAnswer(promiseRequest) {
    const checkNetwork = this.createNetworkChecker();
    try {
      const res = await Promise.race([promiseRequest, this.isNetworkChanged()]);
      return Web3ResponseFabric.createSuccess(res, checkNetwork());
    } catch (e) {
      return Web3ResponseFabric.createError(e, checkNetwork());
    }
  }

  createNetworkChecker() {
    const oldWeb3 = this.web3;
    return () => {
      return oldWeb3 !== this.web3;
    };
  }

  async isNetworkChanged() {
    return this.networkChangePromise;
  }

  async getBalance(addr, option = 'latest') {
    return this.createRaceAnswer(
      this.web3.call('eth_getBalance', addr, option),
    );
  }

  async *iterateBalance(address) {
    let checkNetwork = this.createNetworkChecker();
    const self = this;

    let promiseResolve;
    let promiseResponse = new Promise(resolve => (promiseResolve = resolve));

    function handler(error, balance) {
      const isNetworkChanged = checkNetwork();
      const res = Web3ResponseFabric.createComplex(
        balance,
        error,
        isNetworkChanged,
      );
      console.log('--- handler call, before promise', res);

      promiseResolve(res);
      promiseResponse = new Promise(resolve => (promiseResolve = resolve));

      console.log('--- result after promise');
      checkNetwork = self.createNetworkChecker();
    }

    this.web3.on('balance', { address }, handler);

    console.log('hey hey');
    while (true) {
      const res = await promiseResponse;
      console.log('-- before val', res);
      const val = yield res;
      console.log('-- after val', val);
    }
    console.log('--- finished yield');
  }

  async getTransactionConfirm(hash) {
    let receipt;
    const checkNetwork = this.createNetworkChecker();

    // TODO: unplug from utils?
    // eslint-disable-next-line no-unused-vars
    for await (const index of generators.repeatWithInterval(
      RECEIPT_STATUS_CONFIRM_TIMEOUT,
    )) {
      const { result, isNetworkChanged, error } = this.createRaceAnswer(
        this.web3.call('eth_getTransactionReceipt', hash),
      );
      if (isNetworkChanged || checkNetwork()) {
        return Web3ResponseFabric.createNetworkChanged();
      }

      if (!result) {
        return Web3ResponseFabric.createError(new Error('Receipt not found'));
      }

      if (error) {
        return Web3ResponseFabric.createError(error);
      }

      if (result.status) {
        receipt = result;
        break;
      }
    }

    const status = Boolean(parseInt(receipt.status, 16));

    if (!status) {
      return Web3ResponseFabric.createError(new Error('Transaction failure'));
    }

    return Web3ResponseFabric.createSuccess(receipt);
  }

  // TODO: rename Web3Api folder to Web3
}
