declare module '@endpass/utils/generators' {
  export function repeatWithInterval(ms: number): Generator;
  export function sleep<T>(ms: number, result: T): Promise<T>;
}
