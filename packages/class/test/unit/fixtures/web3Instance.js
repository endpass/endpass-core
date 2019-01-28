import Web3 from 'web3';
import { ProviderFactory } from '@/provider';

class Web3Factory {
  static create(provider) {
    const web3 = new Web3();

    web3.setProvider(provider);

    return web3;
  }
}

const NETWORK = {
  id: 1,
  networkType: 'main',
  currency: 1,
  name: 'Main',
  url: [
    'wss://eth-mainnet.endpass.com:2084',
    'wss://eth-mainnet.endpass.com',
    'https://eth-mainnet.endpass.com:2083',
    `https://mainnet.infura.io/${ENV.infuraConf.key}`,
  ],
};

const defaultProvider = ProviderFactory.create(NETWORK.url);

const web3Instance = Web3Factory.create(defaultProvider);

export default web3Instance;
