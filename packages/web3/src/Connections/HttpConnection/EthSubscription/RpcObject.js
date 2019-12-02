// TODO: move generateID to somewhere?
const generateId = () => {
  return `rpc-${(+new Date()).toString(16)}-r${(Math.random() * 1e8).toString(
    16,
  )}`;
};

export default class RpcObject {
  static createObject(method, ...args) {
    return {
      id: generateId(),
      method,
      params: args,
    };
  }
}
