import { INFURA_KEY } from '@/constants';

export default class Network {}

Network.NET_ID = Object.freeze({
  MAIN: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  ETHEREUM_CLASSIC: 61,
});

Network.NETWORK_URL_HTTP = Object.freeze({
  [Network.NET_ID.MAIN]: [
    'https://eth-mainnet.endpass.com:2083',
    `https://mainnet.infura.io/${INFURA_KEY}`,
  ],
  [Network.NET_ID.ROPSTEN]: [
    'https://eth-ropsten.endpass.com:2083',
    `https://ropsten.infura.io/${INFURA_KEY}`,
  ],
  [Network.NET_ID.RINKEBY]: [`https://rinkeby.infura.io/${INFURA_KEY}`],
  [Network.NET_ID.ETHEREUM_CLASSIC]: [
    'https://etc-mainnet.endpass.com:2083',
    'https://etc-geth.0xinfra.com',
  ],
});

Network.NETWORK_URL = Object.freeze({
  [Network.NET_ID.MAIN]: ['wss://eth-mainnet.endpass.com:2084'].concat(
    Network.NETWORK_URL_HTTP[Network.NET_ID.MAIN],
  ),
  [Network.NET_ID.ROPSTEN]: ['wss://eth-ropsten.endpass.com:2084'].concat(
    Network.NETWORK_URL_HTTP[Network.NET_ID.ROPSTEN],
  ),
  [Network.NET_ID.RINKEBY]: Network.NETWORK_URL_HTTP[Network.NET_ID.RINKEBY],
  [Network.NET_ID.ETHEREUM_CLASSIC]: [
    'wss://etc-mainnet.endpass.com:2084',
  ].concat(Network.NETWORK_URL_HTTP[Network.NET_ID.ETHEREUM_CLASSIC]),
});

Network.CURRENCIES = Object.freeze([
  {
    name: 'ETH',
    id: 1,
  },
  {
    name: 'ETH-TEST',
    id: 2,
  },
  {
    name: 'ETC',
    id: 3,
  },
]);

Network.DEFAULT_NETWORKS = Object.freeze({
  [Network.NET_ID.MAIN]: {
    id: Network.NET_ID.MAIN,
    networkType: 'main',
    currency: 1,
    name: 'Main',
    url: Network.NETWORK_URL[Network.NET_ID.MAIN],
  },
  [Network.NET_ID.ROPSTEN]: {
    id: Network.NET_ID.ROPSTEN,
    name: 'Ropsten',
    networkType: 'ropsten',
    currency: 2,
    url: Network.NETWORK_URL[Network.NET_ID.ROPSTEN],
  },
  [Network.NET_ID.RINKEBY]: {
    id: Network.NET_ID.RINKEBY,
    name: 'Rinkeby',
    networkType: 'rinkeby',
    currency: 2,
    url: Network.NETWORK_URL[Network.NET_ID.RINKEBY],
  },
  [Network.NET_ID.ETHEREUM_CLASSIC]: {
    id: Network.NET_ID.ETHEREUM_CLASSIC,
    name: 'Ethereum classic',
    networkType: 'ethClassic',
    currency: 3,
    url: Network.NETWORK_URL[Network.NET_ID.ETHEREUM_CLASSIC],
  },
});
