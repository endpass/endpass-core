declare module '@endpass/utils/build' {
  export function exec(cmd: string): string;

  // @todo config (?)
  export function assetsPath(
    _path: string,
    config: object
  ): string;

  export function createNotifierCallback(
    packageConfig: object
  ): (
    severity: string,
    errors: {
      file: string,
      name: string
    }[]
  ) => void;

  export function getCommitHash(): string;
}
