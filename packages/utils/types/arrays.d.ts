declare module '@endpass/utils/arrays' {
  export function uniq(
    arr: Array<string | number>
  ): Array<string | number>;

  export function mapArrayByProp(
    arr: Array<string | number>,
    prop: string | number
  ): {[key: string | number]: object}
}
