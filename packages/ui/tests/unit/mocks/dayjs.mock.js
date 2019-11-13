jest.mock('dayjs', () => () => ({
  format: jest.fn().mockImplementation(() => '2010-10-10 4:00'),
  month: jest.fn().mockImplementation(() => 10),
  year: jest.fn().mockImplementation(() => 2019)
}));
