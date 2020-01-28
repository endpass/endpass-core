import NotifyHandler from '@/class/NotifyHandler';

describe('NotifyHandler class', () => {
  let notify;
  const data = 'data';

  beforeEach(() => {
    notify = new NotifyHandler();
  });

  it('should be an NotifyHandler instance', () => {
    expect(notify).toBeInstanceOf(NotifyHandler);
  });

  it('should subscribe handler', () => {
    const cb = jest.fn();

    notify.subscribe(cb);
    notify.handleObservers(data);

    expect(cb).toBeCalledWith(data);
  });

  it('should unsubscribe handler', () => {
    const cb = jest.fn();

    notify.subscribe(cb);
    notify.handleObservers(data);
    notify.unsubscribe(cb);
    notify.handleObservers(data);

    expect(cb).toBeCalledTimes(1);
  });

  it('should destroy instance', () => {
    const cb = jest.fn();

    notify.subscribe(cb);
    notify.handleObservers(data);
    notify.destroy();
    notify.handleObservers(data);

    expect(cb).toBeCalledTimes(1);
  });
});
