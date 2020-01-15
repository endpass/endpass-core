/**
 * Convert query string to map object
 * @param {string} [path]
 * @return {object}
 */
export default function(path = '') {
  const lines = path.replace(/^\?/, '').split('&');
  const mapResult = lines.reduce((map, line) => {
    const values = line.split('=');
    const key = values[0];
    if (key) {
      // eslint-disable-next-line
      map[key] = values[1];
    }
    return map;
  }, {});

  return mapResult;
}
