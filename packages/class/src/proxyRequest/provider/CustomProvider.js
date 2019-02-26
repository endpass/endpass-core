import LocalProvider from './LocalProvider';
import ServerProvider from './ServerProvider';
import { NotificationError } from '@/error';

const error = new NotificationError({
  title: 'Error saving account',
  text: 'Not allowed to save account in current mode',
  type: 'is-warning',
});

class CustomApi {
  constructor(serverUrl, connection) {
    this.url = serverUrl;
    this.localProvider = new LocalProvider(serverUrl);
    this.serverProvider = new ServerProvider(serverUrl, connection);
  }

  localProviderRequest(params) {
    const { url } = params;

    if (url.includes('/account')) {
      throw error;
    }

    return this.localProvider.request(params);
  }

  add(params) {
    return this.localProviderRequest(params);
  }

  async read(params) {
    const { url } = params;

    if (url.includes('/account')) {
      return this.serverProvider.request(params);
    }

    return this.localProviderRequest(params);
  }

  write(params) {
    return this.localProviderRequest(params);
  }

  remove(params) {
    return this.localProviderRequest(params);
  }

  clear = async () => ({ success: true });
}

export default class CustomProvider {
  constructor(serverUrl, connection) {
    this.api = new CustomApi(serverUrl, connection);
  }

  request(params) {
    const { method } = params;
    return this.api[method](params);
  }
}
