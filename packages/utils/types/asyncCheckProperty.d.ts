declare module '@endpass/utils/asyncCheckProperty' {
  export default function(
    object: object,
    path: string | string[],

    // Any value can be passed into lodash,
    // and any function may be used as predicate
    predicate: (value: any) => any,
    timer: number,
  ): Promise<any>;
}
