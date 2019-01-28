jest.mock('@/wallet/proxy/hardware/TrezorProxy', () => ({
  getNextWallets: jest.fn(),
}));
