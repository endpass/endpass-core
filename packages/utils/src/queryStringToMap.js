// @ts-check

/**
 * Convert query string to map object
 * @param {string} [path]
 * @returns {object}
 */
export default function(path = '') {
  const lines = path.replace(/^\?/, '').split('&');
  /** @type {{ [x: string]: any }} */
  const initialAcc = {};

  return lines.reduce((acc, line) => {
    const [key, value] = line.split('=');

    if (key) {
      return Object.assign(acc, {
        [key]: value,
      });
    }

    return acc;
  }, initialAcc);
}
