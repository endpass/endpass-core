// @ts-check

export default class RequestError extends Error {
  /**
   *
   * @param {string=} message
   * @param {number=} code
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  /**
   *
   * @param {Error} error
   * @param {number=} code
   * @return {RequestError}
   */
  static createFromError(error, code) {
    if (error instanceof RequestError) {
      return error;
    }

    const res = new RequestError(error.message, code);
    return res;
  }
}
