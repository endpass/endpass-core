import Base from './Base';
import GetBlockPooling from '@/Connections/HttpConnection/EthSubscription/Pooling/GetBlockPooling';

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
    if (this.blockNumber !== blockData.number) {
      this.blockNumber = blockData.number;
      this.handleObservers(blockData);
    }
  };

  destroy() {
    super.destroy();
    this.pooling.stopPooling();
  }
}
