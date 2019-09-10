import CrossWindowMessenger from '@/CrossWindowMessenger';

describe('CrossWindowMessenger class', () => {
  const createBus = () => {
    const bus = {
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
          source: bus,
        };
        this.list.forEach(({ cb }) => {
          cb(ev);
        });
      },
    };
    return bus;
  };

  let busMock = createBus();

  let messengerOne;
  let messengerTwo;

  describe('methods', () => {
    beforeEach(() => {
      busMock = createBus();
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

    it('should send data and wait response', async () => {
      expect.assertions(1);

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

    it('should handle data by subscribe', done => {
      const methodName = 'checkMethod';

      messengerTwo.subscribe(methodName, (payload, req) => {
        expect(req.method).toBe(methodName);
        expect(payload).toEqual({
          field: 'field',
        });
        done();
      });

      messengerOne.send(methodName, {
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

    it('should subscribe and unsubscribe correctly', () => {
      const handler = jest.fn();
      const method = 'checkSubscribe';

      messengerTwo.subscribe(method, handler);

      messengerOne.send(method, {});
      messengerOne.send(method, {});

      messengerTwo.unsubscribe(handler);

      messengerOne.send(method, {});

      expect(handler).toBeCalledTimes(2);
    });

    it('should subscribe to all methods', () => {
      const handler = jest.fn();

      messengerTwo.subscribe(handler);

      messengerOne.send('one');
      messengerOne.send('two');

      messengerTwo.unsubscribe(handler);

      messengerOne.send('one', {});

      expect(handler).toBeCalledTimes(2);
    });

    it('should subscribe to array of methods', () => {
      const handler = jest.fn();

      messengerTwo.subscribe(['one', 'two'], handler);

      messengerOne.send('one');
      messengerOne.send('two');
      messengerOne.send('three');

      messengerTwo.unsubscribe(handler);

      messengerOne.send('one');

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

  describe('listen', () => {
    let messengerListenerOne;
    let messengerListenerTwo;
    beforeEach(() => {
      busMock = createBus();
      messengerListenerOne = new CrossWindowMessenger({
        name: 'listenOne',
        bus: busMock,
        target: busMock,
        to: 'listenTwo',
        from: 'listenOne',
      });
      messengerListenerTwo = new CrossWindowMessenger({
        name: 'listenTwo',
        bus: busMock,
        to: 'listenOne',
        from: 'listenTwo',
      });
    });

    it('should listen only', () => {
      const handler = jest.fn();
      const handlerSecond = jest.fn();

      messengerListenerTwo.subscribe(handler);
      messengerListenerOne.subscribe(handlerSecond);

      messengerListenerOne.send('methodName');

      expect(handler).toBeCalled();
      expect(handlerSecond).not.toBeCalled();
    });
  });

  describe('answer to answer', () => {
    beforeEach(() => {
      busMock = createBus();

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

    it('should call only one answer', () => {
      const dataOne = 'dataOne';
      const dataOneAnswer = 'dataOneAnswer';
      const dataTwo = 'dataTwo';
      const handlerOne = jest.fn();
      const handlerTwo = jest.fn();
      messengerOne.subscribe((payload, req) => {
        // step 3.
        expect(payload).toBe(dataTwo);

        // will be ignored in messengerTwo
        req.answer(dataOneAnswer);
        handlerOne();
      });

      messengerTwo.subscribe((payload, req) => {
        // step 2.
        expect(payload).toBe(dataOne);
        req.answer(dataTwo);
        handlerTwo();
      });

      // step 1.
      messengerOne.send('method', dataOne);

      expect(handlerOne).toBeCalledTimes(1);
      expect(handlerTwo).toBeCalledTimes(1);
    });
  });
});
