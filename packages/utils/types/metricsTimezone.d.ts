declare module '@endpass/utils/metricsTimezone' {
  export default function getTimezone(): {
    timezone: string;
    timezoneOffset: number;
  };
}
