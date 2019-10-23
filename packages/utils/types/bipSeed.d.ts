declare module '@endpass/utils/bipSeed' {
  export function generateSeedKey(): string;
  export function mnemonicToSeedSync(seedPhrase: string): Buffer;
}
