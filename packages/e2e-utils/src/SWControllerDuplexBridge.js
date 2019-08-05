import { CrossWindowMessenger } from '@endpass/class';

const E2E_SW_METHODS = {
  E2E_MOCK_ROUTE: 'E2E_MOCK_ROUTE',
  E2E_MOCK_ROUTE_ONCE: 'E2E_MOCK_ROUTE_ONCE',
  E2E_SETUP_FINISH: 'E2E_SETUP_FINISH',
  E2E_CLEAR_MOCKS: 'E2E_CLEAR_MOCKS',
};

const DIRECTION = {
  CLIENT: 'e2e-sw-client',
  HOST: 'e2e-sw-host',
};

class SWControllerDuplexBridge {
  /**
   * @param {object} options
   * @param {Window} [options.target]
   * @param {Window} [options.bus]
   * @param {SWController} [options.controller]
   * @param {string} [options.name]
   * @param {boolean} [options.isHost]
   * @param {boolean} showLogs
   */
  constructor({
    target,
    controller,
    showLogs = false,
    isHost = false,
    name = '',
    bus,
  }) {
    this.controller = controller || null;
    this.messenger = new CrossWindowMessenger({
      from: isHost ? DIRECTION.HOST : DIRECTION.CLIENT,
      to: isHost ? DIRECTION.CLIENT : DIRECTION.HOST,
      showLogs,
      target,
      bus,
      name,
    });
    // Meta field for more comfortable responsibility identification
    this.isSender = !!target;
    this.isReceiver = !this.isSender;
    this.setupFinishResolver = null;
  }

  /**
   * @param {object} payload
   * @param {string} payload.url
   * @param {string} [payload.method]
   * @param {*} payload.response
   * @throws {Error}
   */
  mockRoute(payload) {
    if (!this.isSender) {
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
    if (!this.isSender) {
      throw new Error(
        'Send is not possible without target window! Initialize bridge with it and try again!',
      );
    }

    this.messenger.send(E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE, payload);
  }

  clearMocks() {
    this.messenger.send(E2E_SW_METHODS.E2E_CLEAR_MOCKS);
  }

  // call in auth
  awaitSetupFinish() {
    return this.messenger.sendAndWaitResponse(E2E_SW_METHODS.E2E_SETUP_FINISH);
  }

  // call in connect before start tests
  awaitSetupStart() {
    return new Promise(resolve => {
      this.messenger.subscribe((payload, { method, answer }) => {
        if (method === E2E_SW_METHODS.E2E_SETUP_FINISH) {
          resolve();
          this.setupFinishResolver = answer;
        }
      });
    });
  }

  // call in connect after mocks are done
  setupFinish() {
    if (!this.setupFinishResolver) {
      return;
    }
    this.setupFinishResolver();
    this.setupFinishResolver = null;
  }

  subscribe() {
    if (!this.controller) {
      throw new Error(
        'Subscribtion is not possible without target controller! Initialize bridge with it and try again!',
      );
    }

    this.messenger.subscribe((payload, { method }) => {
      switch (method) {
        case E2E_SW_METHODS.E2E_MOCK_ROUTE:
          this.controller.mockRoute(payload);
          break;
        case E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE:
          this.controller.mockRouteOnce(payload);
          break;
        case E2E_SW_METHODS.E2E_CLEAR_MOCKS:
          this.controller.clearMocks();
          break;
        default:
          break;
      }
    });
  }
}

export default SWControllerDuplexBridge;
