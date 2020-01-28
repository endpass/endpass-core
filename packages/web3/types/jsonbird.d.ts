declare module 'jsonbird' {
  type JSONBirdOptions = {
    readableMode: string;
    writableMode: string;
  };

  export default class JSONBird {
    constructor(options: JSONBirdOptions);

    on(method: string, cb: Function): void;

    write(data: any): void;

    call(method: string, ...args: Array<any>): Promise<any>;
  }
}
