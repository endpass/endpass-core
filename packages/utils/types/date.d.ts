declare module '@endpass/utils/date' {
  type DayJsDate = Date | object | string | number;

  export function formateDate(date: DayJsDate, template?: string): string;

  export function fromNow(date: DayJsDate): string;

  export function fromTo(fromDate: DayJsDate, toDate: DayJsDate): string;

  export function addToDate(date: DayJsDate, value: number, unit: string): Date;

  export function getWeek(date: Date): number;
}
