// ろ (ro) illustration: a winding road. Ro as in road.
// The one stroke is the road itself: it starts far away at the top, zigzags down, then sweeps round in a big bend
// and comes towards you at the bottom, getting wider as it gets closer.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const ROAD = '#6E7280', SHADE = '#565A66', VERGE = '#8FB36A', VERGE_SHADE = '#6E9650', LINE = '#FFF4EE';

type P = [number, number];
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Samples a path made of M and relative c commands (as KanjiVG writes them) into evenly spaced-ish points. */
function sample(d: string, per = 24): P[] {
  const nums = (s: string) => (s.match(/-?\d*\.?\d+/g) || []).map(Number);
  const [, m, rest] = d.match(/^M([^c]+)(c.*)$/)!;
  let [x, y] = nums(m);
  const out: P[] = [[x, y]];
  for (const seg of rest.split('c').filter(Boolean)) {
    const n = nums(seg);
    for (let i = 0; i + 5 < n.length; i += 6) {
      const [x1, y1, x2, y2, x3, y3] = [x + n[i], y + n[i + 1], x + n[i + 2], y + n[i + 3], x + n[i + 4], y + n[i + 5]];
      for (let k = 1; k <= per; k++) {
        const t = k / per, u = 1 - t;
        out.push([u * u * u * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          u * u * u * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3]);
      }
      x = x3; y = y3;
    }
  }
  return out;
}

/** A band along the points whose half-width grows from w0 to w1 and rounds off at the near end; from/to pick a slice across it (-1..1). */
function band(pts: P[], w0: number, w1: number, from = -1, to = 1) {
  const L: P[] = [], R: P[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const f = i / (pts.length - 1), end = Math.max(0, (f - .93) / .07);
    const nx = -dy / len, ny = dx / len, w = (w0 + (w1 - w0) * f) * Math.sqrt(1 - end * end);
    L.push([p[0] + nx * w * from, p[1] + ny * w * from]);
    R.push([p[0] + nx * w * to, p[1] + ny * w * to]);
  });
  return 'M' + [...L, ...R.reverse()].map(([a, b]) => `${r2(a)},${r2(b)}`).join(' L') + 'Z';
}

/** Centre-line dashes that get longer and fatter towards the viewer. */
function dashes(pts: P[]) {
  const out: string[] = [];
  for (let i = 6; i < pts.length - 4;) {
    const f = i / pts.length, len = Math.round(3 + f * 6), gap = Math.round(3 + f * 5);
    const seg = pts.slice(i, Math.min(i + len, pts.length - 2));
    out.push(`<path d="M${seg.map(([a, b]) => `${r2(a)},${r2(b)}`).join(' L')}" fill="none" stroke="${LINE}" stroke-width="${r2(.5 + f * 1.4)}" stroke-linecap="round"/>`);
    i += len + gap;
  }
  return out.join('');
}

const draw: Draw = S => {
  const pts = sample(S[0]);
  return [
    // grassy verges either side of the road
    `<path d="${band(pts, 3, 14)}" fill="${VERGE}"/>` +
      `<path d="${band(pts, 3, 14, .55, 1)}" fill="${VERGE_SHADE}"/>`,
    // the road, with its right-hand edge in shade
    `<path d="${band(pts, 1.8, 10.5)}" fill="${ROAD}"/>` +
      `<path d="${band(pts, 1.8, 10.5, .5, 1)}" fill="${SHADE}"/>`,
    // dashed white line down the middle
    dashes(pts),
  ];
};

export default draw;
