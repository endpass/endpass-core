import { CrossWindowMessenger } from '@endpass/class';

const E2E_SW_METHODS = {
  E2E_MOCK_ROUTE: 'E2E_MOCK_ROUTE',
  E2E_MOCK_ROUTE_ONCE: 'E2E_MOCK_ROUTE_ONCE',
  E2E_FINISH_SETUP: 'E2E_FINISH_SETUP',
  E2E_CLEAR_MOCKS: 'E2E_CLEAR_MOCKS',
};

class SWControllerDuplexBridge {
  /**
   * @param {Window} [options.target]
   * @param {SWController} [options.controller]
   * @param {boolean} showLogs
   */
  constructor({ target, controller, showLogs = false }) {
    this.setupFinishReceiveResolver = null;
    this.setupFinishSendResolver = null;
    this.controller = controller || null;
    this.messenger = new CrossWindowMessenger({
      from: 'e2e-sw-client',
      to: 'e2e-sw-host',
      showLogs,
      target,
    });
    // Meta field for more comfortable responsibility indetification
    this.isSender = !!target;
    this.isReceiver = !this.isSender;
  }

  // FIXME: crutch, remove when problem with CrossWindowMessenger will be solved
  subscribeOnIncomingMessages() {
    window.addEventListener('message', ({ data }) => {
      if (data.from === 'endpass-cw-msgr-e2e-sw-client') {
        switch (data.method) {
          case E2E_SW_METHODS.E2E_MOCK_ROUTE:
            this.controller.mockRoute(data.payload);
            break;
          case E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE:
            this.controller.mockRouteOnce(data.payload);
            break;
          case E2E_SW_METHODS.E2E_CLEAR_MOCKS:
            this.controller.clearMocks();
            break;
          case E2E_SW_METHODS.E2E_FINISH_SETUP:
            this.resolveFinishSetupReceive();
            break;
          default:
            break;
        }
      }
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

  finishSetup() {
    this.messenger.send(E2E_SW_METHODS.E2E_FINISH_SETUP);
    this.resolveFinishSetupSend();
  }

  subscribe() {
    if (!this.controller) {
      throw new Error(
        'Subscribtion is not possible without target controller! Initialize bridge with it and try again!',
      );
    }

    // FIXME: crutch, see FIXME comment above
    this.subscribeOnIncomingMessages();
    //   this.messenger.subscribe(({ method, payload }) => {
    //     switch (method) {
    //       case E2E_SW_METHODS.E2E_MOCK_ROUTE:
    //         this.controller.mockRoute(payload);
    //         break;
    //       case E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE:
    //         this.controller.mockRouteOnce(payload);
    //         break;
    //       case E2E_SW_METHODS.E2E_CLEAR_MOCKS:
    //         this.controller.clearMocks();
    //         break;
    //       default:
    //         break;
    //     }
    //   });
  }

  resolveFinishSetupSend() {
    if (this.setupFinishSendResolver) {
      this.setupFinishSendResolver();
    }
  }

  resolveFinishSetupReceive() {
    if (this.setupFinishReceiveResolver) {
      this.setupFinishReceiveResolver();
    }
  }

  awaitSetupFinishSend() {
    return new Promise(resolve => {
      this.setupFinishSendResolver = resolve;
    });
  }

  awaitSetupFinishReceive() {
    return new Promise(resolve => {
      this.setupFinishReceiveResolver = resolve;
    });
  }
}

export default SWControllerDuplexBridge;
