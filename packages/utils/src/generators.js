// @ts-check

/**
 * @template T
 * @param {number} ms
 * @param {T} [result]
 * @return {Promise<T>}
 */
const sleep = (ms, result) =>
  new Promise(resolve => setTimeout(() => resolve(result), ms));

/**
 *
 * @param {number} ms
 * @return {AsyncIterableIterator<number>}
 */
// eslint-disable-next-line generator-star-spacing
const repeatWithInterval = async function*(ms) {
  let count = -1;
  yield (count += 1);
  while (true) {
    await sleep(ms);
    yield (count += 1);
  }
};

module.exports = {
  sleep,
  repeatWithInterval,
};
