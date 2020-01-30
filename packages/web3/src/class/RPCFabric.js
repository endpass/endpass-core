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
    // id field must NOT to be in response,
    // it shows that this is event from server, not request
    return {
      jsonrpc: '2.0',
      method,
      params,
    };
  }
}
