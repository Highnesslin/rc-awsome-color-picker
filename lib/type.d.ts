/// <reference types="vite/client" />
interface EyeDropperConstructor {
  new (): EyeDropper
}

interface ColorSelectionOptions {
  signal: AbortSignal
}

interface ColorSelectionResult {
  sRGBHex: string
}

interface EyeDropper extends EyeDropperConstructor {
  open: (options?: ColorSelectionOptions = {}) => Promise<ColorSelectionResult>
}

declare interface Window {
  EyeDropper: EyeDropper | undefined
}
