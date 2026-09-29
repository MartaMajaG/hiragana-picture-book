import { illustrations } from '../illustrations';
import { STROKES, type Kana } from '../data/kana';

/**
 * Builds the picture layer for a kana as crisp vector parts.
 * Each part gets an index so the parts can bloom in on a stagger once the strokes are written.
 */
export function illustrationMarkup(kana: Kana): string {
  const draw = illustrations[kana.romaji];
  if (!draw) return '';
  return draw(STROKES[kana.kana])
    .map((part, i) => `<g class="pc" style="--i:${i}">${part.replace(/^!/, '')}</g>`)
    .join('');
}

export const halo = (hue: number, alpha = 0.14) => `hsl(${hue} 70% 62% / ${alpha})`;
