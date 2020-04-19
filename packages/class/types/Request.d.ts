import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';

export type RequestAnswerFactory = (request: AxiosPromise) => Promise<any>;

export type RequestCreateParams = {
  config: AxiosRequestConfig;
  http: AxiosInstance;
  createAnswer?: RequestAnswerFactory;
};

export type UploadField = {
  [key: string]: any;
};

declare class Request {
  constructor(params: RequestCreateParams);

  config: AxiosRequestConfig;

  get(url: string, config?: AxiosRequestConfig): Promise<any>;

  post(url: string, body?: any, config?: AxiosRequestConfig): Promise<any>;

  delete(url: string, config?: AxiosRequestConfig): Promise<any>;

  upload(
    url: string,
    fields: UploadField,
    config?: AxiosRequestConfig,
  ): Promise<any>;
}

export default Request;
