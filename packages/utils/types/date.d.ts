declare module '@endpass/utils/date' {
  type DayJsDate = Date | object | string | number;

  export function formateDate(date: DayJsDate, template?: string): string;

  export function fromNow(date: DayJsDate): string;

  export function fromTo(fromDate: DayJsDate, toDate: DayJsDate): string;

  export function addToDate(date: DayJsDate, value: number, unit: string): Date;

  export function getWeek(date: Date): number;

  export function toEqualLocalTime(date: DayJsDate): Date;

  export function dayBeginInUTC(date: DayJsDate): number;

  export function localDateFromApi(
    object: object,
    fieldName: string,
  ): Date | null;

  export function localDateToApi(
    object: object,
    fieldName: string,
  ): number | null;
}
