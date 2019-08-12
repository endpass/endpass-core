const replaceAll = (str, find, match) => str.split(find).join(match);

const createWildCardUrl = url => {
  let wildCardUrl = '';
  if (url.includes('*')) {
    wildCardUrl = url;

    // ** -> (.*)...$
    wildCardUrl = replaceAll(wildCardUrl, '**', '(.*)');
    // `address/**` -> `address/(.*)`
    // `address/**/123` -> `address/(.*)/123`

    // * -> (.*)\/, if exist after
    wildCardUrl = replaceAll(wildCardUrl, '/*/', '\\/(.*)\\/');
    // `address/*/` -> `address/\\/(.*)\\/`

    // * -> (.*)$, if end
    wildCardUrl = wildCardUrl.replace(new RegExp('\\*$'), '([^/]*)');
    // `address/*` -> `address/([^/]*)`

    wildCardUrl = `${wildCardUrl}$`;
    // `address/(****)$`;
  }
  return wildCardUrl;
};

export default {
  createWildCardUrl,
};
