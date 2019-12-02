import BaseConnection from './BaseConnection';
import WsConnection from './WsConnection';
import HttpConnection from './HttpConnection';

export default class ConnectionFactory {
  /**
   * @param {string=} url
   * @return {BaseConnection|HttpConnection|WsConnection}
   */
  static getClassByUrl(url) {
    if (!url) {
      return BaseConnection;
    }

    if (url.indexOf('ws') === 0) {
      return WsConnection;
    }

    return HttpConnection;
  }

  /**
   * @param {string=} url
   * @return {BaseConnection|HttpConnection|WsConnection}
   */
  static create(url) {
    const Connection = ConnectionFactory.getClassByUrl(url);
    return new Connection(url);
  }
}
