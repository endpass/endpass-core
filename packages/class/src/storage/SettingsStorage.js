import pick from 'lodash/pick';
import { AVAILABLE_USER_META_PROPS } from '@/constants';

class SettingsStorage {
  constructor({ storage, storageKey = '' }) {
    if (!storage) {
      throw new Error('Settings storage can not be created without storage!');
    }

    this.storageKey = storageKey;
    this.storage = storage;
  }

  /* eslint-disable-next-line */
  getStorageKey(key) {
    return `${key}:${this.storageKey}`;
  }

  save = (key, meta) => {
    if (!this.storage.save) {
      throw new Error('Provided storage does not implements save method!');
    }

    const pickedMeta = pick(meta, AVAILABLE_USER_META_PROPS);

    this.storage.save(this.getStorageKey(key), pickedMeta);
  };

  load = key => {
    if (!this.storage.load) {
      throw new Error('Provided storage does not implements load method!');
    }

    return this.storage.load(this.getStorageKey(key));
  };

  clear = key => {
    if (!this.storage.remove) {
      throw new Error('Provided storage does not implements remove method!');
    }

    this.storage.remove(this.getStorageKey(key));
  };
}

export default SettingsStorage;
