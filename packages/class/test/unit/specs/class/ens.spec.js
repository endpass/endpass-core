const { createENSClass } = require.requireActual('@/ens');

describe('ENS Resolver', () => {
  it('should set web3', async () => {
    expect.assertions(1);

    const netId = 3;
    const checkAddr = 'checkAddr';
    const ERC20Token = createENSClass({
      eth: {
        Contract: () => {
          return {
            options: {},
            methods: {
              resolver: () => () => checkAddr,
            },
          };
        },
        net: {
          getId: () => netId,
        },
      },
    });
    const addr = await ERC20Token.getAddress('ETH');

    expect(addr).toBe(checkAddr);
  });
});
