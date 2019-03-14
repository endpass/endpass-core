import CrossWindowMessenger from '@/CrossWindowMessenger';

describe('CrossWindowMessenger class', () => {
  const busMock = {
    list: [],
    addEventListener(msg, cb) {
      this.list.push({
        msg,
        cb,
      });
    },
    removeEventListener(msg, cb) {
      this.list = this.list.filter(item => item.cb !== cb);
    },
    postMessage(data) {
      const ev = {
        data,
        source: this,
      };
      this.list.forEach(({ cb }) => {
        cb(ev);
      });
    },
  };

  let messengerOne;
  let messengerTwo;

  beforeEach(() => {
    messengerOne = new CrossWindowMessenger({
      name: 'one',
      target: busMock,
      bus: busMock,
      to: 'two',
      from: 'one',
    });

    messengerTwo = new CrossWindowMessenger({
      name: 'two',
      target: busMock,
      bus: busMock,
      to: 'one',
      from: 'two',
    });
  });

  describe('methods', () => {
    it('should send data and wait response', async () => {
      messengerTwo.subscribe('check', (payload, req) => {
        req.answer({
          receivePayload: payload,
          newPayload: 'data',
        });
      });

      const res = await messengerOne.sendAndWaitResponse('check', {
        field: 'field',
      });

      expect(res).toEqual({
        receivePayload: {
          field: 'field',
        },
        newPayload: 'data',
      });
    });

    it('should handle data by subscribe', (done) => {

      messengerTwo.subscribe('check', (payload) => {
        expect(payload).toEqual({
          field: 'field',
        });
        done();
      });

      messengerOne.send('check', {
        field: 'field',
      });
    });

    it('should send message only to one direction', () => {
      const method = 'checkOne';
      const handler = jest.fn();
      const secondHandler = jest.fn();

      messengerOne.subscribe(method, handler);
      messengerTwo.subscribe(method, secondHandler);

      messengerOne.send(method, {});

      expect(secondHandler).toHaveBeenCalledTimes(1);
      expect(handler).not.toBeCalled();
    });

    it('should subscribe and clearSubscribe correctly', () => {
      const handler = jest.fn();
      const method = 'checkSubscribe';

      messengerTwo.subscribe(method, handler);

      messengerOne.send(method, {});
      messengerOne.send(method, {});

      messengerTwo.unsubscribe(handler);

      messengerOne.send(method, {});

      expect(handler).toBeCalledTimes(2);
    });

    it('should destroy instance', () => {
      const method = 'checkDispose';
      const handler = jest.fn();

      messengerTwo.subscribe(method, handler);

      messengerTwo.destroy();

      messengerOne.send(method, {});

      expect(handler).not.toBeCalled();
    });
  });
});
