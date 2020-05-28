declare module '@endpass/utils/metrics' {
  export function getExternalIP(): Promise<string | null>;

  export function getFingerprintJsonData(): Promise<{
    [key: string]: string | number;
  }>;

  export function encryptMetric(data: any): string;
}
