// @ts-check
export default class Web3ResponseFabric {
  /**
   * @param {any} result
   * @param {Error?} error
   * @param {boolean} isNetworkChanged
   * @return {Web3Response}
   */
  static createResponse(result, error = null, isNetworkChanged = false) {
    return {
      result,
      isNetworkChanged,
      error,
    };
  }

  /**
   * @param {Error?} error
   * @param {boolean=} [isNetworkChanged]
   * @return {Web3Response}
   */
  static createError(error = null, isNetworkChanged) {
    return Web3ResponseFabric.createResponse(null, error, isNetworkChanged);
  }

  /**
   * @return {Web3Response}
   */
  static createNetworkChanged() {
    return Web3ResponseFabric.createResponse(null, null, true);
  }

  /**
   * @param {any} result
   * @param {boolean=} [isNetworkChanged]
   * @return {Web3Response}
   */
  static createSuccess(result, isNetworkChanged) {
    return Web3ResponseFabric.createResponse(
      isNetworkChanged ? null : result,
      null,
      isNetworkChanged,
    );
  }

  /**
   * @param {any} result
   * @param {Error} error
   * @param {boolean} isNetworkChanged
   * @return {Web3Response}
   */
  static createComplex(result, error, isNetworkChanged) {
    if (isNetworkChanged) {
      return Web3ResponseFabric.createNetworkChanged();
    }
    if (error) {
      return Web3ResponseFabric.createError(error);
    }
    return Web3ResponseFabric.createSuccess(result);
  }
}
