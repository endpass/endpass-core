const ERRORS = {
  AUTH_CANCELED_BY_USER: 'AUTH_CANCELED_BY_USER',
  AUTH: 'AUTH',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  USER_NOT_AUTHORIZED: 'USER_NOT_AUTHORIZED',
  ACCOUNT_UPDATE: 'ACCOUNT_UPDATE',
  SIGN: 'SIGN',
  RECOVERY: 'RECOVERY',
  REQUEST_DATA: 'REQUEST_DATA',
  BRIDGE_PROVIDE_METHOD: 'BRIDGE_PROVIDE_METHOD',
  OAUTH_REQUIRE_ID: 'OAUTH_REQUIRE_ID',
  OAUTH_REQUIRE_AUTHORIZE: 'OAUTH_REQUIRE_AUTHORIZE',
  OAUTH_NOT_LOGGED_IN: 'OAUTH_NOT_LOGGED_IN',
  OAUTH_INITIALIZE_INSTANCE: 'OAUTH_INITIALIZE_INSTANCE',
  OAUTH_AUTHORIZE: 'OAUTH_AUTHORIZE',
  OAUTH_AUTHORIZE_STATE: 'OAUTH_AUTHORIZE_STATE',
  OAUTH_AUTHORIZE_EXCHANGE_TOKEN: 'OAUTH_AUTHORIZE_EXCHANGE_TOKEN',
  EVENT_EMITTER_NOT_PROVIDED: 'EVENT_EMITTER_NOT_PROVIDED',
  CREATE_DOCUMENT: 'CREATE_DOCUMENT',
  POPUP_CLOSED: 'POPUP_CLOSED',
  NOT_DEFINED: 'NOT_DEFINED',
};

const ERRORS_TITLE = {
  AUTH_CANCELED_BY_USER: 'Authentication cancelled by user',
  AUTH: 'Authentication Error!',
  AUTH_LOGOUT: 'Logout Error!',
  USER_NOT_AUTHORIZED: 'User not authorized!',
  ACCOUNT_UPDATE: 'Account updating failed!',
  SIGN: 'Sign Error!',
  RECOVERY: 'Recovery Error!',
  REQUEST_DATA: 'Request data error',
  BRIDGE_PROVIDE_METHOD:
    'You should provide method into you question to bridge!',
  OAUTH_REQUIRE_ID: 'Connect library requires OAuth client id!',
  OAUTH_REQUIRE_AUTHORIZE: 'Request fail user is not authorized',
  OAUTH_NOT_LOGGED_IN: 'Logout failed: not logged in',
  OAUTH_INITIALIZE_INSTANCE: 'Options setup failed: initialize instance first',
  OAUTH_AUTHORIZE: 'Authorization failed',
  OAUTH_AUTHORIZE_STATE: 'Authorization failed: state check unsuccessful',
  OAUTH_AUTHORIZE_EXCHANGE_TOKEN:
    'Authorization failed: token exchange unsuccessful',
  EVENT_EMITTER_NOT_PROVIDED: 'Event emitter is not provided',
  CREATE_DOCUMENT: 'Document creation error',
  POPUP_CLOSED: 'The popup was closed',
  NOT_DEFINED: 'Endpass connect not defined error',
};

export default class ConnectError {
  static create(code, message) {
    const errorMessage =
      message || ERRORS_TITLE[code] || ERRORS_TITLE.NOT_DEFINED;
    const error = new Error(errorMessage);
    error.code = code;
    return error;
  }

  static createFromError(error, defaultCode = ERRORS.NOT_DEFINED) {
    if (!(error instanceof Error)) {
      return ConnectError.create(defaultCode);
    }

    if (!error.code) {
      const resError = new Error(error.message);
      resError.code = defaultCode;
      resError.stack = error.stack;
      return resError;
    }

    return error;
  }

  static get ERRORS() {
    return ERRORS;
  }
}
