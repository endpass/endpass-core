export default class HttpRequester {
  constructor(url) {
    this.url = url;
  }

  call(object) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(object),
    });
  }
}
