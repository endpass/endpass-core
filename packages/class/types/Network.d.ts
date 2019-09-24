declare enum NET_IDS {
  MAIN = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  ETHEREUM_CLASSIC = 61
}

type NETWORK_URL = {
  [index in keyof typeof NET_IDS]: string[];
}

type CURRENCY = {
  name: string;
  id: number;
}

type NETWORK = {
  id: keyof typeof NET_IDS;
  networkType: string;
  currency: number;
  name: string;
  url: string[];
}

type DEFAULT_NETWORKS = {
  [index in keyof typeof NET_IDS]: NETWORK;
}

declare class Network {
  static NET_ID: {
    MAIN: 1;
    ROPSTEN: 3;
    RINKEBY: 4;
    ETHEREUM_CLASSIC: 61;
  };

  static NETWORK_URL: NETWORK_URL;

  static NETWORK_URL_HTTP: NETWORK_URL;

  static CURRENCIES: CURRENCY[];

  static DEFAULT_NETWORKS: DEFAULT_NETWORKS;
}


declare namespace Network {
  export interface NET_ID {
    MAIN: 1;
    ROPSTEN: 3;
    RINKEBY: 4;
    ETHEREUM_CLASSIC: 61;
  }
}

export default Network;
