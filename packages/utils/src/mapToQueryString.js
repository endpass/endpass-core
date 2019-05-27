/**
 * Convert map to string query and concat to url
 *
 * @param url
 * @param params
 * @return {string}
 */
export default function(url, params) {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const stringedParams = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const delimiter = url.includes('?') ? '&' : '?';

  return `${url}${delimiter}${stringedParams}`;
}
