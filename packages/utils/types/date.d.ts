declare module '@endpass/utils/date' {
  function formateDate(date: Date): string;
  function fromNow(date: Date): string;
  function fromTo(fromDate: Date, toDate: Date): string;
  function addToDate(date: Date, value: number, unit: string): Date;
}
