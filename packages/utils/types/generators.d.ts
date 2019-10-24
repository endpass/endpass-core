declare module '@endpass/utils/generators' {
  export function sleep<T>(ms: number, result: T): Promise<T>;
  export function repeatWithInterval(ms: number): AsyncIterableIterator<number>;
}
