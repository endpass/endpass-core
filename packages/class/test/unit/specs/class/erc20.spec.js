import web3Instance from 'fixtures/web3Instance';

const { createERC20TokenClass } = require.requireActual('@/erc20');

describe('ERC20 Token', () => {
  const tokenInfo = {
    name: 'token',
    symbol: 'ABC',
    decimals: 18,
    totalSupply: 100,
    balance: 1,
  };

  let address = '0xb8c77482e45f1f44de1745f52c74426c631bdd52';

  let erc20;

  // method.call() returns given val
  const contractMethod = val => ({
    call: jest.fn(() => val),
  });

  const contractMethods = {
    name: () => contractMethod(tokenInfo.name),
    symbol: () => contractMethod(tokenInfo.symbol),
    decimals: () => contractMethod(tokenInfo.decimals),
    totalSupply: () => contractMethod(tokenInfo.totalSupply),
    balanceOf: () => contractMethod(tokenInfo.balance),
  };

  beforeEach(() => {
    const ERC20Token = createERC20TokenClass(web3Instance);
    erc20 = new ERC20Token(address);
  });

  it('should set web3', () => {
    const checkValue = { test: 'value' };

    const ERC20Token = createERC20TokenClass({
      eth: {
        Contract: () => checkValue,
      },
    });
    erc20 = new ERC20Token();
    const contract = erc20.getContract();

    expect(contract).toEqual(checkValue);
  });

  it('saves address', () => {
    expect(erc20.address).toBe(address);
  });

  it('fetches contract from web3', () => {
    const contract = erc20.getContract();
    expect(contract).toBeTruthy();

    // Call again, contract should be cached
    const contract2 = erc20.getContract();
    expect(contract2).toEqual(contract);
  });

  it('builds Token from tokeninfo', async () => {
    expect.assertions(4);

    const contract = erc20.getContract();
    contract.methods = contractMethods;

    const token = await erc20.getToken();

    expect(token).toBeInstanceOf(Object);

    expect(token.name).toEqual(tokenInfo.name);
    expect(token.symbol).toEqual(tokenInfo.symbol);
    expect(token.decimals).toEqual(tokenInfo.decimals);
  });
});
