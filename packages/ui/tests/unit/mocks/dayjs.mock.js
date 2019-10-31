jest.mock('dayjs', () => () => ({
  format: jest.fn().mockImplementation(() => '2010-10-10 4:00'),
}));
