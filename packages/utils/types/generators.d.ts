declare module '@endpass/utils/generators' {
  function repeatWithInterval(ms: number): Generator;
  function sleep<T>(ms: number, result: T): Promise<T>;
}
