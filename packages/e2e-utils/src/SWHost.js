import { CrossWindowMessenger } from '@endpass/class';
import { E2E_SW_METHODS, DIRECTION } from './constants';

class SWHost {
  /**
   * @param {object} options
   * @param {Window} [options.mockTarget]
   * @param {string} [options.name]
   * @param {boolean} [options.showLogs]
   */
  constructor({ mockTarget, showLogs = false, name = '' }) {
    if (!mockTarget) {
      throw new Error(
        'Send is not possible without mockTarget window! Initialize host with mockTarget and try again!',
      );
    }

    this.clientResumeResolver = null;

    this.mockMessenger = new CrossWindowMessenger({
      from: DIRECTION.HOST,
      to: DIRECTION.CLIENT,
      showLogs,
      target: mockTarget,
      name: `msg-host[mock]-${name}`,
    });

    this.setupMessenger = new CrossWindowMessenger({
      from: DIRECTION.HOST,
      to: DIRECTION.CLIENT,
      showLogs,
      target: mockTarget,
      name: `msg-host[setup]-${name}`,
    });
  }

  /**
   * @param {object} payload
   * @param {string} payload.url
   * @param {string} [payload.method]
   * @param {*} payload.response
   * @throws {Error}
   * @returns {Promise}
   */
  mockRoute(payload) {
    return this.mockMessenger.sendAndWaitResponse(
      E2E_SW_METHODS.E2E_MOCK_ROUTE,
      payload,
    );
  }

  /**
   * @param {object} payload
   * @param {string} payload.url
   * @param {string} [payload.method]
   * @param {*} payload.response
   * @throws {Error}
   * @returns {Promise}
   */
  mockRouteOnce(payload) {
    return this.mockMessenger.sendAndWaitResponse(
      E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE,
      payload,
    );
  }

  /**
   * @returns {Promise}
   */
  clearMocks() {
    return this.mockMessenger.sendAndWaitResponse(
      E2E_SW_METHODS.E2E_MOCK_CLEAR,
    );
  }

  /**
   * call from connect for catch resolver and pass that auth is ready for mocks
   * @returns {Promise}
   */
  awaitClientPaused() {
    return new Promise(resolve => {
      this.setupMessenger.subscribe(
        E2E_SW_METHODS.E2E_CLIENT_RESUME,
        (payload, { answer }) => {
          resolve();
          this.clientResumeResolver = answer;
        },
      );
    });
  }

  /**
   * call from connect when ready for continue run auth
   */
  resumeClient() {
    if (!this.clientResumeResolver) {
      return;
    }
    this.clientResumeResolver();
    this.clientResumeResolver = null;
  }
}

export default SWHost;
