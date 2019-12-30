declare class LocalStorage {
  static save(key: string, data: any): void;

  static remove(key: string): void;

  static load(key: string): null | any;
}

export default LocalStorage;
