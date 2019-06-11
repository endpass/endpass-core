import { CrossWindowMessenger } from '@endpass/class';

const E2E_SW_METHODS = {
  E2E_MOCK_ROUTE: 'E2E_MOCK_ROUTE',
  E2E_MOCK_ROUTE_ONCE: 'E2E_MOCK_ROUTE_ONCE',
};

class SWControllerDuplexBridge {
  /**
   * @param {Window} [options.target]
   * @param {SWController} [options.controller]
   * @param {boolean} showLogs
   */
  constructor({ target, controller, showLogs = false }) {
    this.controller = controller || null;
    this.messenger = new CrossWindowMessenger({
      from: 'e2e-sw-client',
      to: 'e2e-sw-host',
      showLogs,
      target,
    });
  }

  /**
   * @param {object} payload
   * @param {string} payload.url
   * @param {string} [payload.method]
   * @param {*} payload.response
   * @throws {Error}
   */
  mockRoute(payload) {
    if (!this.target) {
      throw new Error(
        'Send is not possible without target window! Initialize bridge with it and try again!',
      );
    }

    this.messenger.send(E2E_SW_METHODS.E2E_MOCK_ROUTE, payload);
  }

  /**
   * @param {object} payload
   * @param {string} payload.url
   * @param {string} [payload.method]
   * @param {*} payload.response
   * @throws {Error}
   */
  mockRouteOnce(payload) {
    if (!this.target) {
      throw new Error(
        'Send is not possible without target window! Initialize bridge with it and try again!',
      );
    }

    this.messenger.send(E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE, payload);
  }

  subscribe() {
    if (!this.controller) {
      throw new Error(
        'Subscribtion is not possible without target controller! Initialize bridge with it and try again!',
      );
    }

    this.messenger.subscribe(({ method, payload }) => {
      switch (method) {
        case E2E_SW_METHODS.E2E_MOCK_ROUTE:
          this.controller.mockRoute(payload);
          break;
        case E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE:
          this.controller.mockRouteOnce(payload);
          break;
        default:
          break;
      }
    });
  }
}

export default SWControllerDuplexBridge;
