declare module '@endpass/utils/date' {
  export function formateDate(date: Date): string;
  export function fromNow(date: Date): string;
  export function fromTo(fromDate: Date, toDate: Date): string;
  export function addToDate(date: Date, value: number, unit: string): Date;
}
