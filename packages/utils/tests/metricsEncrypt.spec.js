import encryptMetric from '@/metricsEncrypt';

describe('metrics > metricsEncrypt', () => {
  it('should correctly encrypt data', () => {
    expect(encryptMetric('0.0.0.0')).toEqual('IjAuMC4wLjAi');
  });
});
