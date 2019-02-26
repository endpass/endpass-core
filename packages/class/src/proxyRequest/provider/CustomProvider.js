import LocalProvider from './LocalProvider';
import ServerProvider from './ServerProvider';
import { NotificationError } from '@/error';
import privateMethods from './privateMethods';

const error = new NotificationError({
  title: 'Error saving account',
  text: 'Not allowed to save account in current mode',
  type: 'is-warning',
});

const privateLocal = {
  localProviderRequest: Symbol('localProviderRequest'),
};

export default class CustomProvider {
  constructor(serverUrl, connection) {
    this.url = serverUrl;
    this.localProvider = new LocalProvider(serverUrl);
    this.serverProvider = new ServerProvider(serverUrl, connection);
  }

  request(params) {
    const { method } = params;
    const methodName = privateMethods[method];
    return this[methodName](params);
  }

  [privateLocal.localProviderRequest](params) {
    const { url } = params;

    if (url.includes('/account')) {
      throw error;
    }

    return this.localProvider.request(params);
  }

  [privateMethods.add](params) {
    return this[privateLocal.localProviderRequest](params);
  }

  async [privateMethods.read](params) {
    const { url } = params;

    if (url.includes('/account')) {
      return this.serverProvider.request(params);
    }

    return this[privateLocal.localProviderRequest](params);
  }

  [privateMethods.write](params) {
    return this[privateLocal.localProviderRequest](params);
  }

  [privateMethods.remove](params) {
    return this[privateLocal.localProviderRequest](params);
  }

  [privateMethods.clear] = async () => ({ success: true });
}
