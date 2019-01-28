export const proxies = {
  TrezorProxy: 'TrezorProxy',
  LedgerProxy: 'LedgerProxy',
  HDProxy: 'HDProxy',
};

const loaders = {
  [proxies.TrezorProxy]() {
    return import('./hardware/TrezorProxy');
  },
  [proxies.LedgerProxy]() {
    return import('./hardware/LedgerProxy');
  },
  [proxies.HDProxy]() {
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
