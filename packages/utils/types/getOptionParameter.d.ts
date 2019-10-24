declare module '@endpass/utils/getOptionParameter' {
  export function getOptionParameter(
    item: object | string | number,
    value: string | number
  ): object | Array<any> | string | number;
}
