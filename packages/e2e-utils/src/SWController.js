import nanoid from 'nanoid';
import METHODS from './static/SWMessagesMethods';

class SWController {
  /**
   * @param {ServiceWorker} sw
   */
  constructor(sw) {
    this.sw = sw;
  }

  /**
   * @param {object} data
   */
  sendMessage(data) {
    this.sw.postMessage(data);
  }

  /**
   * @param {string} options.url
   * @param {string} [options.method]
   * @param {*} [options.response]
   */
  mockRoute({ url, method = 'GET', response = {}, headers = {} }) {
    this.sendMessage({
      method: METHODS.MOCK,
      mock: {
        id: nanoid(),
        method: method.toUpperCase(),
        headers,
        url,
        response,
      },
    });
  }

  /**
   * @param {string} options.url
   * @param {string} [options.method]
   * @param {*} [options.response]
   */
  mockRouteOnce({ url, method = 'GET', response = {}, headers = {} }) {
    this.sendMessage({
      method: METHODS.MOCK_ONCE,
      mock: {
        id: nanoid(),
        method: method.toUpperCase(),
        headers,
        url,
        response,
      },
    });
  }

  clearMocks() {
    this.sendMessage({
      method: METHODS.CLEAR_ALL_MOCKS,
    });
  }
}

export default SWController;
