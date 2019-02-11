// classes WITH web3 instance inject dependency
export { createENSClass } from './ens';
export { createWalletClass } from './wallet';
export { createTransactionClass } from './transaction/Transaction';
export { createERC20TokenClass } from './erc20';

// classes WITHOUT web3 instance usage
export { ProxyRequest } from './proxyRequest';
export { default as EventEmitter } from './EventEmitter';
export { default as Web3Factory } from './Web3Factory';
export { ProviderFactory } from './provider';
export { default as InpageProvider } from './provider/InpageProvider';

export { default as DappBridge } from './DappBridge';
export { LocalStorage, SettingsStorage } from './storage';

export {
  default as TransactionFactory,
} from './transaction/TransactionFactory';
export { NotificationError } from './error';
export { default as Token } from './Token';
