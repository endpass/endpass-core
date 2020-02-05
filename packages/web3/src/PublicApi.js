import Web3Api from '@/Web3Api';
import BalancePlugin from '@/plugins/Balance';

const RECEIPT_STATUS_CONFIRM_TIMEOUT = 2000;

export default class PublicApi {
  /**
   *
   * @param {object} params
   * @param {string} params.netUrl
   */
  constructor({ netUrl }) {
    this.web3Api = new Web3Api({
      netUrl,
      plugins: [BalancePlugin],
    });
  }

  /**
   * @return {Web3Api}
   */
  get web3() {
    return this.web3Api;
  }

  /**
   * @param {string} url
   * @return {CompositePlugin}
   */
  setNetwork(url) {
    return this.web3.setNetwork(url);
  }

  /**
   * @param {any} args
   * @return {Promise<any>}
   */
  call(...args) {
    return this.web3.call(...args);
  }

  /**
   * @param {string} addr
   * @param {string} option
   * @return {Promise<string>}
   */
  async getBalance(addr, option = 'latest') {
    return this.web3.call('eth_getBalance', addr, option);
  }

  /**
   * @param {string} address
   * @return {Promise<string>}
   */
  async getCode(address) {
    return this.web3.call('eth_getCode', address);
  }

  /**
   * @param {string} address
   * @return {Promise<string>} next nonce
   */
  async getTransactionCount(address) {
    return this.web3.call('eth_getTransactionCount', address);
  }

  /**
   *
   * @param {string} signedTx
   * @return {Promise<string>} hash of transaction
   */
  async sendRawTransaction(signedTx) {
    return this.web3.call('eth_sendRawTransaction', signedTx);
  }

  /**
   * @param {string} address
   * @return {any}
   */
  iterateBalance(address) {
    return this.web3.emitterToIterator('balance', { address });
  }

  /**
   * @param {string} hash
   * @return {Promise<object>} Receipt object of transaction
   */
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
