import Base from './Base';
import GetBlockPooling from './pooling/GetBlockPooling';

export default class NewHeads extends Base {
  static paramName = 'newHeads';

  constructor(props) {
    super(props);
    this.blockNumber = '';
    this.pooling = new GetBlockPooling({ requester: this.requester });
    this.pooling.subscribe(this.onReceive);
    this.pooling.startPooling();
  }

  onReceive = blockData => {
    const isFirstRequest = !this.blockNumber;
    const isNewValue = this.blockNumber !== blockData.number;

    if (isNewValue) {
      this.blockNumber = blockData.number;
    }

    if (isFirstRequest || !isNewValue) {
      return;
    }

    this.handleObservers(blockData);
  };

  destroy() {
    this.pooling.stopPooling();
    super.destroy();
  }
}
