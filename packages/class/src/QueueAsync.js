import QueueArray from './QueueArray';

class QueueAsync {
  constructor() {
    // enqueues > dequeues
    this.values = new QueueArray();
    this.forcedValues = new QueueArray();
    // dequeues > enqueues
    this.settlers = new QueueArray();
    this.closed = false;
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  get isEmpty() {
    const allQueue = [...this.values, ...this.forcedValues];
    return !allQueue.length;
  }

  putToQueue(value, queue) {
    if (this.closed) {
      throw new Error('Queue was closed');
    }

    if (this.settlers.length === 0) {
      queue.put(value);
      return;
    }

    if (!this.isEmpty) {
      throw new Error('Illegal internal state of the queue');
    }

    this.settlers.take().resolve({ value });
  }

  put(value) {
    this.putToQueue(value, this.values);
  }

  putForce(value) {
    this.putToQueue(value, this.forcedValues);
  }

  /**
   * @returns a Promise for an IteratorResult
   */
  next() {
    let value;

    if (this.forcedValues.length > 0) {
      value = this.forcedValues.take();
    } else if (this.values.length > 0) {
      value = this.values.take();
    }

    if (value) {
      return Promise.resolve({ value });
    }

    if (this.closed) {
      if (this.settlers.length > 0) {
        throw new Error('Illegal internal state of the queue');
      }

      return Promise.resolve({ done: true });
    }

    // Wait for new values to be enqueued
    return new Promise((resolve, reject) => {
      this.settlers.put({ resolve, reject });
    });
  }

  close() {
    while (this.settlers.length > 0) {
      this.settlers.take().resolve({ done: true });
    }

    this.closed = true;
  }
}

export default QueueAsync;
