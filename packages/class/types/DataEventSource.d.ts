declare class DataEventSource {
  constructor(url: string);

  addHandler(handler: Function): void;

  removeHandler(handler: Function): void;
}

export default DataEventSource;
