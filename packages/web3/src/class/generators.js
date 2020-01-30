export const promiseRepeater = () => {
  let iterateResolve = () => {};
  // eslint-disable-next-line no-return-assign
  let iteratePromise = new Promise(resolve => (iterateResolve = resolve));
  return {
    resolve(value) {
      iterateResolve(value);
      // eslint-disable-next-line no-return-assign
      iteratePromise = new Promise(resolve => (iterateResolve = resolve));
    },
    promise() {
      return iteratePromise;
    },
  };
};

export const promiseToIterator = ({ promise, release }) => ({
  async next() {
    const value = await promise();
    return { value, done: false };
  },
  async throw(e) {
    throw e;
  },
  async return() {
    release();
    // eslint-disable-next-line no-console
    // console.log('I have been released !!!');
    return { done: true };
  },
  [Symbol.asyncIterator]() {
    return this;
  },
  [Symbol.iterator]() {
    return this;
  },
});

export const sleep = ms =>
  new Promise(resolve => setTimeout(() => resolve(), ms));
