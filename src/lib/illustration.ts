import { illustrations } from '../illustrations';
import { STROKES, type Kana } from '../data/kana';

/**
 * Builds the picture layer for a kana as crisp vector parts.
 * Each part gets an index so the parts can bloom in on a stagger once the strokes are written.
 * Every colour passes through `pastel`, so all pictures share one soft, watercolour-print palette
 * while each file keeps drawing in plain, readable hex colours.
 */
export function illustrationMarkup(kana: Kana): string {
  const draw = illustrations[kana.romaji];
  if (!draw) return '';
  return draw(STROKES[kana.kana])
    .map((part, i) => `<g class="pc" style="--i:${i}">${pastelize(part.replace(/^!/, ''))}</g>`)
    .join('');
}

/** A soft wash of the character's hue behind its picture, like a sun printed on washi. */
export const halo = (hue: number) => `hsl(${hue} 45% var(--halo-l))`;

/** Softens every hex and hsl() colour in an SVG snippet. */
export function pastelize(svg: string): string {
  // One pass over both forms, so a colour is never softened twice.
  return svg.replace(
    /#([0-9a-f]{6}|[0-9a-f]{3})\b|hsl\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\)/gi,
    (_, hex: string | undefined, h, s, l) => {
      if (!hex) return pastel(+h, +s / 100, +l / 100);
      const x = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16) / 255);
      return pastel(...rgbToHsl(r, g, b));
    },
  );
}

/**
 * Lifts a colour towards the paper and takes the edge off its saturation.
 * Near-blacks (eyes, outlines) become a soft sumi brown instead of washing out to grey.
 */
function pastel(h: number, s: number, l: number): string {
  if (l < 0.28) return hsl(h, s * 0.35, 0.3);
  const s2 = Math.min(1, s * 0.82 + 0.04);
  const l2 = l + (0.95 - l) * 0.26;
  return hsl(h, s2, Math.min(l2, l > 0.96 ? l : 0.97));
}

const hsl = (h: number, s: number, l: number) => `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
