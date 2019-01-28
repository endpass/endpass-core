const injectWeb3 = require.requireActual('@/injectWeb3').default;

describe('Inject web3 instance', () => {
  it('should set web3', () => {
    const web3Instance = 'instance';

    const target = {
      web3: null,
    };

    const creator = injectWeb3(target);

    creator(web3Instance);

    expect(target.web3).toBe(web3Instance);
  });
});
