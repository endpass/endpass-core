export const proxyTypes = {
  TrezorProxy: 'TrezorProxy',
  LedgerProxy: 'LedgerProxy',
  HDProxy: 'HDProxy',
};

const loaders = {
  [proxyTypes.TrezorProxy]() {
    return import('./hardware/TrezorProxy');
  },
  [proxyTypes.LedgerProxy]() {
    return import('./hardware/LedgerProxy');
  },
  [proxyTypes.HDProxy]() {
    return import('./HDProxy');
  },
};

const cache = {};

export default async function loadProxy(name) {
  if (cache[name]) {
    return cache[name];
  }

  const mod = await loaders[name]();
  cache[name] = mod.default;

  return cache[name];
}
