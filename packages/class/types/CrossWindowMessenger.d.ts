export declare type MessengerProps = {
  to: string;
  from: string;
  target?: Window | {};
  name?: string;
  showLogs?: boolean;
  bus?: object;
};

export declare type MessengerRequester = {
  source: Window | {};
  method: string;
  answer: Function;
}

declare class CrossWindowMessenger {
  constructor(props: MessengerProps);

  setTarget(target: Window | {}): void;

  sendAndWaitResponse(method: string, payload?: object): Promise<object>;

  subscribe(method: string, cb: Function): Function;

  subscribe(method: Function): Function;

  unsubscribe(cb: Function): void;

  send(method: string, payload?: object): void;

  destroy(): void;
}

export default CrossWindowMessenger;
