// @ts-check
import get from 'lodash/get';

const RTC_CHANNEL_NAME = 'endpass-metrics';
const CANDIDATE_ATTR_REG = /^a=candidate/;
const CANDIDATE_ATTR_SHORT_REG = /^c=/;
const ADDRESS_REG = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
const GOOGLE_STUN_SERVER = 'stun:stun.l.google.com:19302?transport=udp';

/**
 * Extracts network address from SDP parameters
 * @param {string} rawSdp Raw SDP parameters
 * @returns {string|null}
 */
const getAddressFromSDP = rawSdp => {
  let address = null;
  const sdpParts = rawSdp.split('\r\n');

  sdpParts.forEach(line => {
    if (CANDIDATE_ATTR_REG.test(line)) {
      const parts = line.split(' ');
      const type = parts[7];

      if (type !== 'host') return;

      // eslint-disable-next-line
      address = parts[4];
    } else if (CANDIDATE_ATTR_SHORT_REG.test(line)) {
      const parts = line.split(' ');

      // eslint-disable-next-line
      address = parts[2];
    }
  });

  return address;
};

/**
 * Requests user network address through WetRtc protocol
 * @returns {Promise<string|null>}
 */
const getIP = () => {
  const rtc = new window.RTCPeerConnection({
    iceServers: [
      {
        urls: [GOOGLE_STUN_SERVER],
      },
    ],
  });

  rtc.createDataChannel(RTC_CHANNEL_NAME);

  return new Promise((resolve, reject) => {
    /**
     * @param {RTCPeerConnectionIceEvent} e
     */
    const rtcCandidateHandler = e => {
      if (!e.candidate) return;

      const address = get(
        e,
        'candidate.address',
        getAddressFromSDP(`a=${e.candidate.candidate}`),
      );

      if (!address) return;
      if (!ADDRESS_REG.test(address)) return;

      rtc.removeEventListener('icecandidate', rtcCandidateHandler);

      // eslint-disable-next-line
      return resolve(address);
    };

    rtc.addEventListener('icecandidate', rtcCandidateHandler);

    rtc
      .createOffer()
      .then(e => {
        rtc.setLocalDescription(e);
      })
      .catch(err => {
        rtc.removeEventListener('icecandidate', rtcCandidateHandler);

        return reject(err);
      });
  });
};

export default getIP;
