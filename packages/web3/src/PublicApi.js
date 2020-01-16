import Web3ResponseFabric from '@/class/Web3ResponseFabric';
import Web3Api from '@/Web3Api';
import BalancePlugin from '@/plugins/Balance';

const RECEIPT_STATUS_CONFIRM_TIMEOUT = 2000;

// todo, create web3Api instance, and proxy some methods from web3Api
// todo: make two entry points when build, PublicApi and Web3Api (maybe pass plugin to another point)

export default class PublicApi {
  constructor({ netUrl }) {
    this.web3Api = new Web3Api({
      netUrl,
      plugins: [BalancePlugin],
    });
  }

  setNetwork(url) {
    return this.web3.setNetwork(url);
  }

  get web3() {
    return this.web3Api;
  }

  async getBalance(addr, option = 'latest') {
    return this.web3.toRace(this.web3.call('eth_getBalance', addr, option));
  }

  async getCode(address) {
    return this.web3.call('eth_getCode', address);
  }

  iterateBalance(address) {
    return this.web3.emitterToIterator('balance', { address });
  }

  async getTransactionConfirm(hash) {
    let receipt;
    // eslint-disable-next-line no-unused-vars
    for await (const index of this.web3.timeoutToIterator(
      RECEIPT_STATUS_CONFIRM_TIMEOUT,
    )) {
      const { result, isNetworkChanged, error } = this.web3.toRace(
        this.web3.call('eth_getTransactionReceipt', hash),
      );
      if (isNetworkChanged) {
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
}
