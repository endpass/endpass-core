import QueueArray from '@/QueueArray';

describe('QueueArray class', () => {
  const defaultItems = [1, 2, 3];
  let queue;

  beforeEach(() => {
    queue = new QueueArray(...defaultItems);
  });

  describe('constructor', () => {
    it('should be an Array instance', () => {
      expect(queue).toBeInstanceOf(Array);
    });

    it('should create a valid instance', () => {
      expect(queue).toEqual(defaultItems);
    });
  });

  describe('methods', () => {
    describe('put', () => {
      it('should add value to the end of the queue', () => {
        const newItem = 4;

        queue.put(newItem);

        expect(queue).toEqual([...defaultItems, newItem]);
      });
    });

    describe('take', () => {
      it('should return the first element of the queue', () => {
        const result = queue.take();

        expect(result).toEqual(defaultItems[0]);
      });

      it('should remove item from start of queue', () => {
        // eslint-disable-next-line no-unused-vars
        const [_, ...resultItems] = defaultItems;

        queue.take();

        expect(queue).toEqual(resultItems);
      });
    });
  });
});
