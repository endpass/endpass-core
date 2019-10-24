declare module '@endpass/utils/build' {
  export function exec(cmd: string): string;

  // TODO config ?
  // TODO This method probably `dead code` and should be removed
  export function assetsPath(
    _path: string,
    config: object
  ): string;

  // TODO This method probably `dead code` and should be removed
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
