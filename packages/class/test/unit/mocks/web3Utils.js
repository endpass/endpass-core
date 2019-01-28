import utils from 'web3-utils';

jest.mock('web3-utils', () => {
  const originalWeb3Utils = require.requireActual('web3-utils');

  return originalWeb3Utils;
});

export default utils;
