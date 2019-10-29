declare class RequestError {
  constructor(message?: string, code?: number);

  code: number;

  static createFromError(error: Error, defaultCode: number): RequestError;
}

export default RequestError;
