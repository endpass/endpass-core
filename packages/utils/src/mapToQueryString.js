/**
 * Convert map to string query and concat to url
 * @param {string} url
 * @param {object} params
 * @return {string}
 */
const mapToQueryString = (url, params) => {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const stringedParams = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const delimiter = url.includes('?') ? '&' : '?';

  return `${url}${delimiter}${stringedParams}`;
};

module.exports = mapToQueryString;
