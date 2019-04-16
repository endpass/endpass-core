export default function(url, params) {
  const stringedParams = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const delimiter = url.includes('?') ? '&' : '?';

  return `${url}${delimiter}${stringedParams}`;
}
