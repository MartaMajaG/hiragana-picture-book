// み (mi) illustration: a shooting star, a little meteor. Mi as in "meteor".
// In the first stroke, the loop is the meteor's round glowing head (a friendly star with a face), the long sweeping tail
// is its trail of light, and the diagonal rising to the top zigzag is the far edge of the trail, sparkling where it began.
// The second stroke is a smaller shooting star following behind. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const HEAD = '#F6B83C', HEAD_SHADE = '#E08A2C', PEACH = '#F5A77E', GOLD = '#F8CF5A', CREAM = '#FFF1C4', INK = '#2E2A22';

type P = [number, number];
type Seg = [P, P, P, P];
const f = (n: number) => Math.round(n * 100) / 100;

const bez = ([a, b, c, d]: Seg, t: number): P => {
  const u = 1 - t;
  return [0, 1].map((i) => u ** 3 * a[i] + 3 * u * u * t * b[i] + 3 * u * t * t * c[i] + t ** 3 * d[i]) as P;
};

/** Points along a chain of cubic segments, from the first segment's start to the last one's end. */
const sample = (segs: Seg[], n = 14): P[] => {
  const pts: P[] = [];
  segs.forEach((s, k) => {
    for (let i = k ? 1 : 0; i <= n; i++) pts.push(bez(s, i / n));
  });
  return pts;
};

/** A tapered ribbon of light along a polyline: w0 wide at the start, narrowing to a point at the end. */
const ribbon = (pts: P[], w0: number, w1: number, fill: string) => {
  const L: P[] = [], R: P[] = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const t = i / (pts.length - 1), w = (w0 + (w1 - w0) * Math.pow(t, 0.8)) / 2;
    L.push([p[0] - (dy / len) * w, p[1] + (dx / len) * w]);
    R.push([p[0] + (dy / len) * w, p[1] - (dx / len) * w]);
  });
  const all = [...L, ...R.reverse()];
  return `<path d="M${all.map((p) => `${f(p[0])},${f(p[1])}`).join(' L')}Z" fill="${fill}" stroke="${fill}" stroke-width=".6" stroke-linejoin="round"/>`;
};

/** A layered trail: peach outside, gold inside, a cream core. */
const trail = (pts: P[], w: number) =>
  ribbon(pts, w, 0.4, PEACH) + ribbon(pts, w * 0.6, 0.2, GOLD) + ribbon(pts, w * 0.25, 0.1, CREAM);

/** A chubby five-pointed star with rounded points. */
const star = (cx: number, cy: number, R: number, r: number, rot: number, fill: string) => {
  const pts: P[] = [];
  for (let k = 0; k < 10; k++) {
    const a = rot + (k * Math.PI) / 5, rr = k % 2 ? r : R;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  // round each outer point: cut in towards its neighbours and curve through the tip
  let d = '';
  for (let k = 0; k < 10; k += 2) {
    const tip = pts[k], prev = pts[(k + 9) % 10], next = pts[k + 1];
    const m = (p: P, q: P, s: number): P => [p[0] + (q[0] - p[0]) * s, p[1] + (q[1] - p[1]) * s];
    const a = m(tip, prev, 0.28), b = m(tip, next, 0.28);
    d += `${k ? 'L' : 'M'}${f(a[0])},${f(a[1])} Q${f(tip[0])},${f(tip[1])} ${f(b[0])},${f(b[1])} L${f(next[0])},${f(next[1])} `;
  }
  return `<path d="${d}Z" fill="${fill}" stroke="${fill}" stroke-width="2.4" stroke-linejoin="round"/>`;
};

// Stroke 1, as absolute cubic segments.
const ZIG: Seg[] = [
  [[32.5, 26], [34.38, 27.75], [36.56, 27.7], [39.38, 27.25]],
  [[39.38, 27.25], [43.26, 26.63], [47, 25.5], [51.26, 24.13]],
  [[51.26, 24.13], [55.52, 22.76], [57.51, 24.01], [55.76, 29.25]],
  [[55.76, 29.25], [54.01, 34.49], [49.1, 46.64], [43.76, 59.37]],
];
const TAIL: Seg[] = [
  [[31, 70], [37, 66], [42, 64.2], [47.5, 64.5]],
  [[47.5, 64.5], [66, 67.25], [77.5, 71.12], [91.88, 78.75]],
];
// Stroke 2, reversed so it runs from the little star's head back up its trail.
const SMALL: Seg[] = [
  [[57.26, 94.75], [71.88, 86], [77.26, 69.12], [79.38, 61]],
  [[79.38, 61], [79.87, 59.12], [80.13, 57.13], [79.38, 54.75]],
];

// The upper trail runs from the head up the diagonal and back along the zigzag to where it began.
const UPPER: P[] = [[34, 70], ...sample(ZIG.slice().reverse().map((s) => [s[3], s[2], s[1], s[0]] as Seg))];
// A middle streak fills the fan between the two edges.
const MIDDLE: P[] = sample([[[34, 70], [48, 58], [62, 50], [80, 46]]]);

const draw: Draw = () => [
  // the trail of light fanning out behind the meteor: middle streak, then the long tail and the upper edge
  trail(MIDDLE, 11),
  trail(sample(TAIL), 16),
  trail(UPPER, 12),
  // twinkle where the trail began, at the start of the zigzag
  `<path d="M32.5,20.6 Q33.3,25.2 37.9,26 Q33.3,26.8 32.5,31.4 Q31.7,26.8 27.1,26 Q31.7,25.2 32.5,20.6Z" fill="${GOLD}"/>`,
  // the small shooting star on the second stroke: its trail, then its head
  trail(sample(SMALL), 9),
  star(58.2, 93.6, 8.6, 4.8, -0.95, HEAD_SHADE) + star(57.6, 93, 7.6, 4.3, -0.95, HEAD) +
    `<ellipse cx="55.6" cy="93.6" rx=".9" ry="1.2" fill="${INK}"/><ellipse cx="59.6" cy="93.2" rx=".9" ry="1.2" fill="${INK}"/>` +
    `<path d="M56.4,96.2 Q57.6,97.4 58.8,96.2" fill="none" stroke="${INK}" stroke-width=".7" stroke-linecap="round"/>`,
  // the meteor's head over the loop: a shaded rim, then the bright face
  star(29.6, 76.4, 19, 11, -1.0, HEAD_SHADE),
  star(28.6, 75.4, 17.2, 10, -1.0, HEAD),
  // face: eyes, sparkle dots, pink cheeks and a happy open smile
  `<ellipse cx="24.2" cy="74.4" rx="1.8" ry="2.4" fill="${INK}"/><ellipse cx="32.4" cy="73.4" rx="1.8" ry="2.4" fill="${INK}"/>` +
    `<circle cx="23.6" cy="73.6" r=".6" fill="#fff"/><circle cx="31.8" cy="72.6" r=".6" fill="#fff"/>` +
    `<circle cx="20.6" cy="79" r="2.2" fill="#F2A7A0" opacity=".85"/><circle cx="36.4" cy="77.6" r="2.2" fill="#F2A7A0" opacity=".85"/>` +
    `<path d="M26,78.6 Q28.6,82.4 31.2,78.2Z" fill="${INK}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/>`,
  // highlights, upper left
  `<path d="M17.4,72 C18.2,69.4 20,67.6 22.4,66.8" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
