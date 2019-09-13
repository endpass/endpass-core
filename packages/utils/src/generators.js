const generators = {
  /**
   * @param {number} ms
   * @param {*?} result
   * @return {Promise<*>}
   */
  sleep(ms, result) {
    return new Promise(resolve => setTimeout(() => resolve(result), ms));
  },

  /**
   *
   * @param {number} ms
   * @return {AsyncIterableIterator<number>}
   */
  // eslint-disable-next-line generator-star-spacing
  async *repeatWithInterval(ms) {
    let count = -1;
    yield (count += 1);
    while (true) {
      await generators.sleep(ms);
      yield (count += 1);
    }
  },
};

export default generators;
