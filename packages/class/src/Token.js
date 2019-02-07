import { toChecksumAddress } from 'web3-utils';

export default class Token {
  static asObject({
    address,
    logo,
    name,
    symbol,
    decimals = 18,
    balance = '0',
  }) {
    if (!address) {
      throw new Error("Token can't be created without address!");
    }
    return {
      decimals: parseInt(decimals, 10),
      logo,
      name,
      symbol: symbol && symbol.toUpperCase(),
      address: toChecksumAddress(address),
      balance,
    };
  }

  static getConsistent(token) {
    return {
      ...token,
      address: token.address.toLowerCase(),
    };
  }
}
