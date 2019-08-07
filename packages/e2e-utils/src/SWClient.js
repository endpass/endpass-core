import { CrossWindowMessenger } from '@endpass/class';
import { E2E_SW_METHODS, DIRECTION } from './constants';

const privateFields = {
  subscribe: Symbol('subscribe'),
};

class SWClient {
  /**
   * @param {object} options
   * @param {SWController} [options.controller]
   * @param {string} [options.name]
   * @param {boolean} [options.showLogs]
   */
  constructor({ setupTarget, controller, showLogs = false, name = '' }) {
    if (!setupTarget) {
      throw new Error(
        'Send is not possible without setupTarget window! Initialize client with setupTarget and try again!',
      );
    }

    if (!controller) {
      throw new Error(
        'Subscription is not possible without target controller! Initialize with it and try again!',
      );
    }

    this.controller = controller;
    this.mockMessenger = new CrossWindowMessenger({
      from: DIRECTION.CLIENT,
      to: DIRECTION.HOST,
      showLogs,
      target: window,
      name: `sw-client[mock]-${name}`,
    });

    this.setupMessenger = new CrossWindowMessenger({
      from: DIRECTION.CLIENT,
      to: DIRECTION.HOST,
      showLogs,
      target: setupTarget,
      name: `sw-client[setup]-${name}`,
    });

    this[privateFields.subscribe]();
  }

  /**
   * call from auth, pause initialize and set ready for mocking requests
   * @returns {Promise}
   */
  awaitClientResume() {
    return this.setupMessenger.sendAndWaitResponse(
      E2E_SW_METHODS.E2E_CLIENT_RESUME,
    );
  }

  [privateFields.subscribe]() {
    const { controller } = this;

    const methods = {
      [E2E_SW_METHODS.E2E_MOCK_ROUTE]: payload => controller.mockRoute(payload),
      [E2E_SW_METHODS.E2E_MOCK_ROUTE_ONCE]: payload =>
        controller.mockRouteOnce(payload),
      [E2E_SW_METHODS.E2E_MOCK_CLEAR]: payload =>
        controller.clearMocks(payload),
    };

    this.mockMessenger.subscribe(async (payload, { method, answer }) => {
      if (!methods[method]) {
        return;
      }
      await methods[method](payload);
      answer();
    });
  }
}

export default SWClient;
