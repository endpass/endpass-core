/* eslint-disable max-classes-per-file */
import {
  getExternalIP,
  getFingerprintJsonData,
  encryptMetric,
} from '@/metrics';

const ipAddress = '0.0.0.0';

class RTCPeerConnection {}

RTCPeerConnection.prototype.addEventListener = jest
  .fn()
  .mockImplementation((eventType, handler) => {
    handler({
      candidate: {
        address: ipAddress,
      },
    });
  });
RTCPeerConnection.prototype.removeEventListener = jest.fn();
RTCPeerConnection.prototype.createDataChannel = jest.fn();
RTCPeerConnection.prototype.createOffer = jest.fn().mockResolvedValue();
RTCPeerConnection.prototype.setLocalDescription = jest.fn();

window.RTCPeerConnection = RTCPeerConnection;

jest.mock('fingerprintjs2', () => {
  class Fingerprint {}

  Fingerprint.prototype.get = jest.fn().mockImplementation(handler =>
    handler(
      ['foo', 'bar'],
      [
        {
          key: 'foo',
          value: 'bar',
        },
      ],
    ),
  );

  return Fingerprint;
});

describe('metrics utils', () => {
  describe('getExternalIP', () => {
    it('should return ip through RTCPeerConnection', async () => {
      const address = await getExternalIP();

      expect(address).toEqual(ipAddress);
    });
  });

  describe('getFingerprintJsonData', () => {
    it('should get fingerprint data through fingerprintjs2 library', async () => {
      const fingerprint = await getFingerprintJsonData();

      expect(fingerprint).toEqual({
        foo: 'bar',
      });
    });
  });

  describe('encryptMetric', () => {
    it('should correctly encrypt data', () => {
      expect(encryptMetric(ipAddress)).toEqual('IjAuMC4wLjAi');
    });
  });
});
