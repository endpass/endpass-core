import EventSource, { sources } from 'eventsourcemock';
import DataEventSource from '@/DataEventSource';

Object.defineProperty(global, 'EventSource', {
  value: EventSource,
});

describe('DataEventSource class', () => {
  let dataEventSource;
  let sourceMock;

  // states for EventSource https://developer.mozilla.org/en-US/docs/Web/API/EventSource/readyState
  const OPEN = 1;
  const CLOSED = 2;

  const url = 'url';
  const payload = { data: 'data' };

  const emitEvent = (eventSourceMock, data) => {
    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify(data),
    });
    eventSourceMock.emit(messageEvent.type, messageEvent);
  };

  beforeEach(() => {
    dataEventSource = new DataEventSource(url);
  });

  describe('methods', () => {
    it('should start messaging when add handler', async () => {
      const handler = jest.fn();
      sourceMock = sources[url];

      expect(sourceMock).toBeUndefined();

      dataEventSource.addHandler(handler);
      sourceMock = sources[url];
      sourceMock.emitOpen();
      emitEvent(sourceMock, payload);

      expect(handler).toBeCalled();
    });

    it('should pass payload', async () => {
      const handler = jest.fn();
      dataEventSource.addHandler(ev => {
        handler(ev.data);
      });
      sourceMock = sources[url];
      sourceMock.emitOpen();

      expect(handler).not.toBeCalled();

      emitEvent(sourceMock, payload);

      expect(handler).toBeCalledWith(JSON.stringify(payload));
    });

    it('should stop messaging and close source when last handler removed', async () => {
      const handler = jest.fn();
      const handlerSecond = jest.fn();
      dataEventSource.addHandler(handler);
      dataEventSource.addHandler(handlerSecond);
      sourceMock = sources[url];
      sourceMock.emitOpen();
      emitEvent(sourceMock, payload);

      expect(handler).toBeCalled();
      expect(sourceMock.readyState).toBe(OPEN);

      dataEventSource.removeHandler(handler);

      expect(sourceMock.readyState).toBe(OPEN);

      dataEventSource.removeHandler(handlerSecond);

      expect(sourceMock.readyState).toBe(CLOSED);
    });
  });
});
