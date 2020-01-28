/**
 * Classes mocks
 */
// import 'mocks/class/ens';
// import 'mocks/class/erc20';
// import 'mocks/class/storage/LocalStorage';
// import 'mocks/class/provider/InpageProvider';
// import 'mocks/class/DappBridge';
// import 'mocks/class/wallet/proxy/HDProxy';
// import 'mocks/class/wallet/proxy/hardware/LedgerProxy';
// import 'mocks/class/wallet/proxy/hardware/TrezorProxy';
// import 'mocks/class/proxyRequest/provider/database';

// console.error and console.warn throws errors and fails tests
global.console.error = jest.fn(e => {
  throw new Error(e);
});

global.console.warn = jest.fn(e => {
  throw new Error(e);
});

// Function to immediately flush all pending promises
// Usage: await flushPromises()
global.flushPromises = () => new Promise(resolve => setImmediate(resolve));
