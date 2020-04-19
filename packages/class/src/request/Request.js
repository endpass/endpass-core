// @ts-check

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('Request').RequestCreateParams} RequestCreateParams
 * */

/** @type {import('Request').RequestAnswerFactory} */
const createAnswerDefault = request => request.then(({ data }) => data);

export default class Request {
  /**
   * @param {import('Request').RequestCreateParams} props
   */
  constructor({ config, http, createAnswer = createAnswerDefault }) {
    this.config = config;
    this.createAnswer = createAnswer;
    this.http = http;
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig=} [config]
   * @return {Promise<any>}
   */
  get(url, config) {
    return this.createAnswer(this.http.get(url, { ...this.config, ...config }));
  }

  /**
   * @param {string} url
   * @param {any} body
   * @param {AxiosRequestConfig=} [config]
   * @return {Promise<any>}
   */
  post(url, body, config) {
    return this.createAnswer(
      this.http.post(url, body, {
        ...this.config,
        ...config,
      }),
    );
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig=} [config]
   * @return {Promise<any>}
   */
  delete(url, config) {
    return this.createAnswer(
      this.http.delete(url, {
        ...this.config,
        ...config,
      }),
    );
  }

  /**
   * @param {string} url
   * @param {{[key: string]: any}} fields
   * @param {AxiosRequestConfig=} [config]
   * @return {Promise<any>}
   */
  upload(url, fields, config) {
    const body = Object.keys(fields).reduce((form, key) => {
      form.append(key, fields[key]);
      return form;
    }, new FormData());

    return this.createAnswer(
      this.http.post(url, body, {
        ...this.config,
        headers: {
          ...this.config.headers,
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      }),
    );
  }
}
