// classes WITH web3 instance inject dependency
export { createENSClass } from './ens';
export { createWalletClass } from './wallet';
export { createERC20TokenClass } from './erc20';

// classes WITHOUT web3 instance usage
export { ProxyRequest } from './proxyRequest';
export { default as EventEmitter } from './EventEmitter';
export { default as Web3Factory } from './Web3Factory';
export { ProviderFactory } from './provider';
export { default as Network } from './Network';
export { default as InpageProvider } from './provider/InpageProvider';

export { default as DappBridge } from './DappBridge';
export { LocalStorage, SettingsStorage } from './storage';

export { default as Transaction } from './transaction/Transaction';
export {
  default as TransactionFactory,
} from './transaction/TransactionFactory';

export { NotificationError } from './error';
export { default as Token } from './Token';
export { default as CrossWindowMessenger } from './CrossWindowMessenger';
export { default as QueueArray } from './QueueArray';
export { default as QueueAsync } from './QueueAsync';
