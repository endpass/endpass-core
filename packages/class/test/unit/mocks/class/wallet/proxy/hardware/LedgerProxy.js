jest.mock('@/wallet/proxy/hardware/LedgerProxy', () => ({
  getNextWallets: jest.fn(),
}));
