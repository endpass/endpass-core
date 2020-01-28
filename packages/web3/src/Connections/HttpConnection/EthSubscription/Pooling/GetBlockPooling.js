import generators from '@endpass/utils/generators';
import NotifyHandler from '@/class/NotifyHandler';
import RPCFabric from '@/class/RPCFabric';

const DEFAULT_TIMEOUT = 5000;

export default class GetBlockPooling {
  constructor({ requester }) {
    this.requester = requester;
    this.isWorking = false;
    this.notify = new NotifyHandler();
  }

  subscribe(cb) {
    this.notify.subscribe(cb);
  }

  async startPooling() {
    if (this.isWorking) {
      return;
    }
    this.isWorking = true;

    // eslint-disable-next-line no-unused-vars
    for await (const index of generators.repeatWithInterval(DEFAULT_TIMEOUT)) {
      if (!this.isWorking) {
        break;
      }
      const body = RPCFabric.createRequest({
        id: 'block-pooling',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
      });
      const data = await this.requester.post(body);
      // TODO: if needed step by step block, add option in constructor
      if (data.result) {
        this.notify.handleObservers(data.result);
      }

      if (data.code) {
        // catches some fault =(
        break;
      }
    }
  }

  stopPooling() {
    this.isWorking = false;
    this.notify.unsubscribe();
  }
}
