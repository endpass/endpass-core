jest.mock('@/wallet/proxy/HDProxy', () => ({
  getNextWallets: jest.fn(),
}));
