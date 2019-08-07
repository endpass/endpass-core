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
   * @returns {Promise}
   */
  sendMessage(data) {
    return new Promise(resolve => {
      const { sw } = this;
      const msgId = nanoid();

      const onMessage = ev => {
        const { data = {} } = ev;
        const { msgId: receiveMsgId, msgType: receiveMsgType } = data;
        const isMessageReturn =
          receiveMsgId === msgId && receiveMsgType === METHODS.MSG_TYPE_ANSWER;

        if (!isMessageReturn) {
          return;
        }

        console.log('-- step 3, receive message via channel');
        console.log('--- onMessage', data);

        navigator.serviceWorker.removeEventListener('message', onMessage);
        resolve();
      };
      navigator.serviceWorker.addEventListener('message', onMessage);

      const sendData = {
        ...data,
        msgId,
        msgType: METHODS.MSG_TYPE_REQUEST,
      };

      console.log('-- step 2, send message via channel');

      sw.postMessage(sendData);
    });
  }

  /**
   * @param {object} options
   * @param {string} options.url
   * @param {string} [options.method]
   * @param {*} [options.response]
   * @param {object} [options.headers]
   * @param {number} [options.status]
   * @returns {Promise}
   */
  mockRoute({
    url,
    method = 'GET',
    response = {},
    headers = {},
    status = 200,
  }) {
    return this.sendMessage({
      method: METHODS.MOCK,
      mock: {
        id: nanoid(),
        method: method.toUpperCase(),
        headers,
        status,
        url,
        response,
      },
    });
  }

  /**
   * @param {object} options
   * @param {string} options.url
   * @param {string} [options.method]
   * @param {*} [options.response]
   * @param {object} [options.headers]
   * @param {number} [options.status]
   * @returns {Promise}
   */
  mockRouteOnce({
    url,
    method = 'GET',
    response = {},
    headers = {},
    status = 200,
  }) {
    return this.sendMessage({
      method: METHODS.MOCK_ONCE,
      mock: {
        id: nanoid(),
        method: method.toUpperCase(),
        headers,
        status,
        url,
        response,
      },
    });
  }

  /**
   * @returns {Promise}
   */
  clearMocks() {
    return this.sendMessage({
      method: METHODS.CLEAR_ALL_MOCKS,
    });
  }
}

export default SWController;
