class LocalStorage {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static load(key) {
    const res = localStorage.getItem(key);

    if (!res) return null;

    try {
      return JSON.parse(res);
    } catch (err) {
      return res;
    }
  }
}

export default LocalStorage;
