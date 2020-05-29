// @ts-check
import Fingerprint from 'fingerprintjs2';

/**
 * Requests fingerprint data
 * @returns {Promise<{
 *   [key: string]: string|number,
 * }>}
 */
const getFingerprint = () =>
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

export default getFingerprint;
