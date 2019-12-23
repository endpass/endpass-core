// ATTENTION: required time - 00:00:00 for UTC/GMT tests
// eslint-disable-next-line import/prefer-default-export
export const dateForUTC = {
  default: new Date('Wed Jan 01 2020 00:00:00'),
  string: '2020/01/01',
  positiveGMT: new Date('Wed Jan 01 2020 00:00:00 GMT+0300'),
  negativeGMT: new Date('Wed Jan 01 2020 00:00:00 GMT-0300'),
  zeroGMT: new Date('Wed Jan 01 2020 00:00:00 GMT+0000'),
  timestamp: 1577836800000,
};
