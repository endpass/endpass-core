declare module '@endpass/utils/strings' {
  export function getShortStringWithEllipsis(
    string: string,
    symbolsCount: number
  ): string;

  export function matchString(
    a: string,
    b: string
  ): boolean;

  export function fromHexToUtf8(str: string): string;
}
