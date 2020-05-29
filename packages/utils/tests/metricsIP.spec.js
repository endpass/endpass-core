import getIP from '@/metricsIP';

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

describe('metrics > metricsIP', () => {
  it('should return ip through RTCPeerConnection', async () => {
    expect.assertions(1);

    const address = await getIP();

    expect(address).toEqual(ipAddress);
  });
});
