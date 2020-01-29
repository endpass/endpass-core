export default class RPCFabric {
  static createRequest({ id, method, params }) {
    return {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };
  }

  static createEventAnswer({ method, params }) {
    // id field must not to be in response,
    // it shows that this is response, not request
    return {
      jsonrpc: '2.0',
      method,
      params,
    };
  }
}
