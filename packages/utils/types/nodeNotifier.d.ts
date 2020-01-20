declare module 'node-notifier' {
  type Payload = {
    title: string;
    message: string;
    subtitle?: string;
    icon?: string;
  };

  // eslint-disable-next-line
  export function notify(payload: Payload): void;
}
