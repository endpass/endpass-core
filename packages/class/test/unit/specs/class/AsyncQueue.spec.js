import QueueAsync from '@/QueueAsync';

const takeIterable = async (asyncIterable, count = Infinity) => {
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();

  while (result.length < count) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await iterator.next();

    if (done) break;

    result.push(value);
  }

  return result;
};

describe('takeIterable', () => {
  test('should collect values yielded by an async generator', async function() {
    expect.assertions(4);

    async function* gen() {
      yield 'a';
      yield 'b';
      yield 'c';
    }

    expect(await takeIterable(gen())).toEqual(['a', 'b', 'c']);
    expect(await takeIterable(gen(), 2)).toEqual(['a', 'b']);
    expect(await takeIterable(gen(), 1)).toEqual(['a']);
    expect(await takeIterable(gen(), 0)).toEqual([]);
  });
});

describe('QueueAsync class', () => {
  const defaultItems = [1, 2, 3];
  let queue;
  let emptyQueue;

  beforeEach(() => {
    emptyQueue = new QueueAsync();
    queue = new QueueAsync();

    defaultItems.forEach(item => queue.put(item));
  });

  describe('constructor', () => {
    it('should be an QueueAsync instance', () => {
      expect(queue).toBeInstanceOf(QueueAsync);
    });

    it('should be iterable', () => {
      const result = queue[Symbol.asyncIterator]();

      expect(result).toEqual(queue);
    });
  });

  describe('methods', () => {
    describe('putToQueue', () => {
      it('should add value to the queue', () => {
        const queueMock = {
          put: jest.fn(),
        };

        const newItem = 4;

        queue.putToQueue(newItem, queueMock);

        expect(queueMock.put).toBeCalledTimes(1);
        expect(queueMock.put).toBeCalledWith(newItem);
      });

      it('should resolve values for empty queue', async () => {
        expect.assertions(1);

        const promise = Promise.all([emptyQueue.next(), emptyQueue.next()]);

        const newItem1 = 4;
        const newItem2 = 5;

        emptyQueue.putToQueue(newItem1);
        emptyQueue.putToQueue(newItem2);

        const result = await promise;
        const values = result.map(x => x.value);

        expect(values).toEqual([newItem1, newItem2]);
      });

      it('should throw error with wrong internal state of the queue', async () => {
        expect.assertions(1);

        emptyQueue.next();

        emptyQueue.values.put(1);

        try {
          emptyQueue.putToQueue(1);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should throw error if queue was closed', () => {
        expect.assertions(1);

        emptyQueue.close();

        try {
          emptyQueue.putToQueue(1);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });

    describe('put', () => {
      it('should add value to the end of the queue', async () => {
        expect.assertions(1);

        const newItem = 4;

        queue.put(newItem);
        queue.close();

        const result = await takeIterable(queue);

        expect(result).toEqual([...defaultItems, newItem]);
      });
    });

    describe('putForce', () => {
      it('should add values ​​to the top of the queue respectively', async () => {
        expect.assertions(1);

        const newItem1 = 4;
        const newItem2 = 5;

        queue.putForce(newItem1);
        queue.putForce(newItem2);
        queue.close();

        const result = await takeIterable(queue);

        expect(result).toEqual([newItem1, newItem2, ...defaultItems]);
      });
    });

    describe('isEmpty', () => {
      it('should return true if queue is empty', () => {
        expect(emptyQueue.isEmpty).toEqual(true);
      });

      it('should return false if queue is not empty', () => {
        expect(queue.isEmpty).toEqual(false);
      });

      it('should return false if queue has forced item', () => {
        emptyQueue.putForce(1);

        expect(emptyQueue.isEmpty).toEqual(false);
      });
    });

    describe('next', () => {
      it('should return the first element of the queue', async () => {
        expect.assertions(1);

        const { value } = await queue.next();

        expect(value).toEqual(defaultItems[0]);
      });

      it('should remove item from start of queue', async () => {
        expect.assertions(1);

        await queue.next();
        queue.close();

        // eslint-disable-next-line no-unused-vars
        const [_, ...expected] = defaultItems;
        const result = await takeIterable(queue);

        expect(result).toEqual(expected);
      });

      it('should return done if queue was closed and empty', async () => {
        expect.assertions(1);

        emptyQueue.close();

        const result = await emptyQueue.next();

        expect(result).toEqual({ done: true });
      });

      it('should throw error if queue was closed before resolve', async () => {
        expect.assertions(1);

        emptyQueue.close();
        emptyQueue.settlers = [1];

        try {
          await emptyQueue.next();
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });

    describe('close', () => {
      it('should close the queue', async () => {
        expect.assertions(1);

        queue.close();

        const result = await takeIterable(queue);

        expect(result).toBeTruthy();
      });

      it('should resolve queue before closing', async () => {
        expect.assertions(1);

        const promise = emptyQueue.next();

        emptyQueue.close();

        const result = await promise;

        expect(result).toEqual({ done: true });
      });
    });
  });

  describe('iterable interface', () => {
    it('should return valid result with for-await-of loop', async () => {
      const result = [];

      queue.close();

      // eslint-disable-next-line no-restricted-syntax
      for await (const queueItem of queue) {
        result.push(queueItem);
      }

      expect(result).toEqual(defaultItems);
    });

    it('should wait next value with for-await-of loop', async () => {
      expect.assertions(1);

      const resultLoopPromise = new Promise(async res => {
        const arr = [];

        // eslint-disable-next-line no-restricted-syntax
        for await (const queueItem of queue) {
          arr.push(queueItem);
        }

        res(arr);
      });

      const nextValue = 4;
      queue.put(nextValue);
      queue.close();

      const result = await resultLoopPromise;

      expect(result).toEqual([...defaultItems, nextValue]);
    });
  });
});
