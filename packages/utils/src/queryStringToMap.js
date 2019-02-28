export default function(path = '') {
  const lines = path.split('&');
  const query = lines.reduce((map, line) => {
    const values = line.split('=');
    const key = values[0];
    if (key) {
      // eslint-disable-next-line
      map[key] = values[1];
    }
    return map;
  }, {});
  return query;
}
