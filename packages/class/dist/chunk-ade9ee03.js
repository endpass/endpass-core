import { c as _toConsumableArray } from './chunk-25f6a05b.js';

function getChildrenAddress (hdWallet, offset, limit) {
  return _toConsumableArray(Array(limit)).map(function (_, i) {
    return hdWallet.deriveChild(offset + i).getWallet().getChecksumAddressString();
  });
}

export { getChildrenAddress as a };
