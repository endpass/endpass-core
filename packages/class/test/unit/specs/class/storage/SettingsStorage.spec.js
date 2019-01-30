import { SettingsStorage, LocalStorage } from '@/storage';

const checkKey = 'checkKey';

describe('SettingsStorage', () => {
  const key = 'foo';
  const storageKey = `${key}:${checkKey}`;

  describe('creating instance', () => {
    it('should throw error if storage is not passed to constructor', () => {
      expect(() => {
        /* eslint-disable-next-line */
        new SettingsStorage({});
      }).toThrow();
    });
  });

  describe('save', () => {
    it('should call passed storage save method with generated key', () => {
      const settingsStorage = new SettingsStorage({
        storage: LocalStorage,
        storageKey: checkKey
      });

      settingsStorage.save(key, { activeAccount: 'bar' });

      expect(LocalStorage.save).toHaveBeenCalledWith(storageKey, {
        activeAccount: 'bar',
      });
    });

    it('should throw error if save method is not implemented in passed storage', () => {
      const settingsStorage = new SettingsStorage({ storage: {} });

      expect(() => {
        settingsStorage.save();
      }).toThrow();
    });
  });

  describe('load', () => {
    it('should call passed storage load method with generated key', () => {
      const settingsStorage = new SettingsStorage({
        storage: LocalStorage,
        storageKey: checkKey
      });

      settingsStorage.load(key);

      expect(LocalStorage.load).toHaveBeenCalledWith(storageKey);
    });

    it('should throw error if load method is not implemented in passed storage', () => {
      const settingsStorage = new SettingsStorage({ storage: {} });

      expect(() => {
        settingsStorage.load();
      }).toThrow();
    });
  });

  describe('clear', () => {
    it('should call passed storage remove method with generated key', () => {
      const settingsStorage = new SettingsStorage({
        storage: LocalStorage,
        storageKey: checkKey
      });

      settingsStorage.clear(key);

      expect(LocalStorage.remove).toHaveBeenCalledWith(storageKey);
    });

    it('should throw error if remove method is not implemented in passed storage', () => {
      const settingsStorage = new SettingsStorage({ storage: {} });

      expect(() => {
        settingsStorage.clear();
      }).toThrow();
    });
  });
});
