import ConnectError from '@/ConnectError';

const { ERRORS } = ConnectError;

describe('ConnectError', () => {
  it('should create error object with code', () => {
    const checkError = new Error('Authentication cancelled by user');

    const err = ConnectError.create(ERRORS.AUTH_CANCELED_BY_USER);

    expect(err).toEqual(checkError);
    expect(err.code).toBe(ERRORS.AUTH_CANCELED_BY_USER);
  });

  it('should create error object with code and custom message', () => {
    const customMessage = 'my custom msg';
    const checkError = new Error(customMessage);

    const err = ConnectError.create(
      ERRORS.AUTH_CANCELED_BY_USER,
      customMessage,
    );

    expect(err).toEqual(checkError);
    expect(err.code).toBe(ERRORS.AUTH_CANCELED_BY_USER);
  });

  it('should pass already created error without code', () => {
    const customMessage = 'my custom msg';
    const checkError = new Error(customMessage);

    const err = ConnectError.createFromError(
      checkError,
      ERRORS.AUTH_CANCELED_BY_USER,
    );

    expect(err).toEqual(checkError);
    expect(err.code).toBe(ERRORS.AUTH_CANCELED_BY_USER);
  });

  it('should pass already created error with code', () => {
    const customMessage = 'my custom msg';
    const checkError = new Error(customMessage);
    checkError.code = ERRORS.REQUEST_DATA;

    const err = ConnectError.createFromError(
      checkError,
      ERRORS.AUTH_CANCELED_BY_USER,
    );

    expect(err).toBe(checkError);
    expect(err.code).toBe(ERRORS.REQUEST_DATA);
  });

  it('should pass error as text', () => {
    const customMessage = 'my custom msg';
    const checkError = ConnectError.create(ERRORS.AUTH_CANCELED_BY_USER);

    const err = ConnectError.createFromError(
      customMessage,
      ERRORS.AUTH_CANCELED_BY_USER,
    );

    expect(err).toEqual(checkError);
    expect(err.code).toBe(ERRORS.AUTH_CANCELED_BY_USER);
  });
});
