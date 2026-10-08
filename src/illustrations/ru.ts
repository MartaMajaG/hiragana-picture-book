// る (ru) illustration: a rooster. Ru as in rooster.
// The top bar and the long diagonal are its tail feathers arching up and back over its body,
// the big round sweep is its plump body and breast, and the little loop at the end is its curled wing.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const BODY = '#D9793A', SHADE = '#B35B26', TAIL = '#3E6E6A', TAIL_SHADE = '#2C524F', COMB = '#D9483B', BEAK = '#F2B43E', INK = '#2E2A22';

type P = [number, number];
const r2 = (n: number) => Math.round(n * 100) / 100;

/** A tapered feather along a chain of cubic curves (start point, then 3 points per curve): w wide at the root, pointed at the tip. */
function feather(p: P[], w: number, fill: string) {
  const pts: P[] = [];
  for (let i = 0; i + 3 < p.length; i += 3) {
    const [a, b, c, d] = [p[i], p[i + 1], p[i + 2], p[i + 3]];
    for (let k = i ? 1 : 0; k <= 16; k++) {
      const t = k / 16, u = 1 - t;
      pts.push([0, 1].map(j => u * u * u * a[j] + 3 * u * u * t * b[j] + 3 * u * t * t * c[j] + t * t * t * d[j]) as P);
    }
  }
  const L: P[] = [], R: P[] = [];
  pts.forEach((q, i) => {
    const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, f = i / (pts.length - 1);
    const h = (w / 2) * (1 - f * f) + .3;
    L.push([q[0] - dy / len * h, q[1] + dx / len * h]); R.push([q[0] + dy / len * h, q[1] - dx / len * h]);
  });
  return `<path d="M${[...L, ...R.reverse()].map(([x, y]) => `${r2(x)},${r2(y)}`).join(' L')}Z" fill="${fill}"/>`;
}

const draw: Draw = () => [
  shadow(58, 104, 26),
  // legs and feet
  `<path d="M52,92 L50.5,103 M47,103.5 L55,103.5 M63,92 L63.5,103 M60,103.5 L68,103.5" fill="none" stroke="${BEAK}" stroke-width="2" stroke-linecap="round"/>`,
  // tail: a fan of sickle feathers growing out of the rump; the big front one arches along the diagonal and the top bar
  feather([[40, 64], [37, 58], [33, 54], [28, 54], [24, 54], [21, 57], [19.5, 60.5]], 6, TAIL_SHADE) +
    feather([[42, 64], [44, 54], [46, 45], [43, 41], [40, 37], [32, 39], [25.5, 42.5]], 7, TAIL) +
    feather([[44, 64], [50, 52], [56, 40], [55, 33], [54, 28], [46, 30], [38.5, 31.5]], 7, TAIL_SHADE) +
    feather([[40, 65], [48, 50], [60, 31], [61.5, 21], [62.5, 13.5], [47, 18.5], [33.5, 20.2]], 8.5, TAIL) +
    `<path d="M55.5,20.5 C50,21 45,21.2 40,21" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".6"/>`,
  // neck and plump body, with the breast along the big round sweep
  `<path d="M70,62 C70,54 72,46 76,42 L86,46 C84,52 80,58 78.5,64Z" fill="${BODY}"/>` +
    `<path d="M35.8,59 C51.4,49 78.8,48 78.8,72.1 C78.8,89 64,96.5 51,95.5 C41,94.8 33,88 32.5,78.5 C32.2,70 33.5,63.5 35.8,59Z" fill="${BODY}"/>` +
    `<path d="M70,55 C76,59 78.8,65 78.8,72.1 C78.8,86 64,93.5 52,94 C68,88 77,74 70,55Z" fill="${SHADE}"/>`,
  // the curled wing, along the little loop
  `<path d="M37.93,84.76 C37.93,73.5 56,76 62.31,84.38 C55,87 47,91 41.5,90 C39.3,89.4 37.93,87.5 37.93,84.76Z" fill="${SHADE}"/>` +
    `<path d="M43,85 C47,82.5 53,82.5 57,84.4" fill="none" stroke="${BODY}" stroke-width="1.2" stroke-linecap="round"/>`,
  // head with comb, beak and wattle
  `<path d="M74,40 C73,34 76,32 78,35 C78,30 82,29 83,33.5 C84.5,30 88.5,31 87.5,36 C87,39 84,41 80,41Z" fill="${COMB}"/>` +
    `<circle cx="81" cy="44" r="7.5" fill="${BODY}"/>` +
    `<path d="M87.8,42 L94,45 L87.8,47.2Z" fill="${BEAK}"/>` +
    `<path d="M85.5,48.5 C88.5,49 89,54.5 86.5,55.5 C84.5,56 83.5,52 85.5,48.5Z" fill="${COMB}"/>`,
  // eye and highlights
  `<ellipse cx="83" cy="42.5" rx="1.5" ry="2" fill="${INK}"/><circle cx="82.6" cy="41.9" r=".5" fill="#fff"/>` +
    `<path d="M76,40.5 C77,38.5 78.5,37.4 80.5,37" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M44,60 C50,56 57,54.5 63,55" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
