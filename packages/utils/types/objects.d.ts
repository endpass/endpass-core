declare module '@endpass/utils/objects' {
  export function merge(
    ...obj: any[]
  ): object;

  export function getFrom(
    target: object,
    ...paths: string[]
  ): any?;

  export function parseObjectProperties(
    obj: object,
    prefix?: string
  ): any[];
}
