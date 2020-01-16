export default class web3ResponseFabric {
  static createResponse(result, error = null, isNetworkChanged = false) {
    return {
      result,
      isNetworkChanged,
      error,
    };
  }

  static createError(error = null, isNetworkChanged) {
    return web3ResponseFabric.createResponse(null, error, isNetworkChanged);
  }

  static createNetworkChanged() {
    return web3ResponseFabric.createResponse(null, null, true);
  }

  static createSuccess(result) {
    const isNetworkChanged = result ? result.isNetworkChanged : false;
    return web3ResponseFabric.createResponse(
      isNetworkChanged ? null : result,
      null,
      isNetworkChanged,
    );
  }
}
