import Web3Api from '@/Web3Api';
import BalancePlugin from '@/plugins/Balance';

const RECEIPT_STATUS_CONFIRM_TIMEOUT = 2000;

export default class PublicApi {
  constructor({ netUrl }) {
    this.web3Api = new Web3Api({
      netUrl,
      plugins: [BalancePlugin],
    });
  }

  get web3() {
    return this.web3Api;
  }

  setNetwork(url) {
    return this.web3.setNetwork(url);
  }

  call(...args) {
    return this.web3.call(...args);
  }

  async getBalance(addr, option = 'latest') {
    return this.web3.call('eth_getBalance', addr, option);
  }

  async getCode(address) {
    return this.web3.call('eth_getCode', address);
  }

  iterateBalance(address) {
    return this.web3.emitterToIterator('balance', { address });
  }

  async checkTransactionConfirmed(hash) {
    let receipt;
    // eslint-disable-next-line no-unused-vars
    for await (const index of this.web3.timeoutToIterator(
      RECEIPT_STATUS_CONFIRM_TIMEOUT,
    )) {
      const data = await this.web3.toRace(
        this.web3.call('eth_getTransactionReceipt', hash),
      );
      const { result, isNetworkChanged, error } = data;

      if (isNetworkChanged) {
        throw new Error('Network was changed');
      }

      if (!result) {
        throw new Error('Receipt not found');
      }

      if (error) {
        throw new Error(error);
      }

      if (result.status) {
        receipt = result;
        break;
      }
    }

    const status = Boolean(parseInt(receipt.status, 16));

    if (!status) {
      throw new Error('Transaction failure');
    }
    return receipt;
  }

  destroy() {
    this.web3.destroy();
  }
}
