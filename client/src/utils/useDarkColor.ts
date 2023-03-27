import { TinyColor } from '@ctrl/tinycolor'

export const useDarkColor = (bgColor?: string): boolean => {
  return !bgColor || new TinyColor(bgColor).getLuminance() > 0.28
}
