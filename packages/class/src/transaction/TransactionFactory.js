import { hexToNumber, hexToNumberString, fromWei } from 'web3-utils';

import Transaction from './Transaction';

export default class TransactionFactory {
  static fromSendForm(trx) {
    const value = trx.token ? Transaction.getValueFromWei(trx) : trx.value;
    return Transaction.create({ ...trx, value });
  }

  static fromBlock(trx) {
    const { gasPrice, nonce, chainId, networkId } = trx;

    const adaptData = {
      networkId: chainId ? hexToNumber(chainId) : networkId,
      value: Transaction.getValueFromWei(trx),
      timestamp: new Date().getTime() / 1000,
      nonce: String(nonce),
      gasPrice: fromWei(gasPrice, 'Gwei'),
    };

    return Transaction.create({ ...trx, ...adaptData });
  }

  static fromRequestParams(trx) {
    const { value, gasPrice, gas } = trx;
    const adaptData = {};
    if (value) {
      adaptData.value = fromWei(hexToNumberString(value));
    }
    if (gasPrice) {
      adaptData.gasPrice = fromWei(hexToNumberString(gasPrice), 'Gwei');
    }
    if (gas) {
      adaptData.gasLimit = hexToNumberString(gas);
    }

    return Transaction.create({ ...trx, ...adaptData });
  }

  static fromCryptoData(trx) {
    return Transaction.create({
      ...trx,
      value: fromWei(hexToNumberString(trx.value)),
      nonce: hexToNumberString(trx.nonce),
      gasPrice: fromWei(hexToNumberString(trx.gasPrice), 'Gwei'),
      gasLimit: hexToNumberString(trx.gas),
      networkId: hexToNumber(trx.chainId),
      timestamp: hexToNumber(trx.timestamp),
    });
  }

  static fromCryptoDataHistory(trx) {
    const value = Transaction.getValueFromWei(trx);
    const timestamp = hexToNumber(trx.timestamp);
    return Transaction.create({ ...trx, value, timestamp });
  }
}
