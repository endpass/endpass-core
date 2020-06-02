declare module '@endpass/utils/metricsFingerprint' {
  export default function getFingerprint(): Promise<{
    [key: string]: string | number;
  }>;
}
