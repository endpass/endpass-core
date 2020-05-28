// @ts-check
import get from 'lodash/get';
import Fingerprint from 'fingerprintjs2';

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
export const getExternalIP = () => {
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

/**
 * Requests fingerprint data
 * @returns {Promise<{
 *   [key: string]: string|number,
 * }>}
 */
export const getFingerprintJsonData = () =>
  new Promise(resolve => {
    const finger = new Fingerprint({
      excludeCanvas: true,
    });

    finger.get((_, entries) =>
      resolve(
        entries.reduce(
          (acc, entry) =>
            Object.assign(acc, {
              [entry.key]: entry.value,
            }),
          {},
        ),
      ),
    );
  });

/**
 * Encodes given data with btoa
 * @param {any} data
 * @returns {string}
 */
export const encryptMetric = data =>
  btoa(unescape(encodeURIComponent(JSON.stringify(data))));

export default {
  getExternalIP,
  getFingerprintJsonData,
  encryptMetric,
};
