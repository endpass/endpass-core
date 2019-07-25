jest.mock('@endpass/utils/date', () => ({
  formateDate: jest.fn().mockImplementation(() => '2010-10-10 4:00'),
}));
