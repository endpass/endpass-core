declare module '@endpass/utils/metrics' {
  export function encryptMetric(data: any): string;

  export function getFingerprint(): Promise<{
    [key: string]: string | number;
  }>;

  export function getIP(): Promise<string | null>;

  export function getTimezone(): {
    timezone: string;
    timezoneOffset: number;
  };
}
