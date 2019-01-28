jest.mock('@/storage/LocalStorage', () => ({
  save: jest.fn(),

  remove: jest.fn(),

  load: jest.fn(),
}));
