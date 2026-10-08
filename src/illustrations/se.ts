// せ (se) illustration: a mother serpent and her baby coiled round a branch. Se as in serpent.
// The long horizontal is the branch. The long left stroke is the mother: head raised above the branch, body wrapped round it,
// hanging down and curling off to the right. The short right stroke is her baby, head up and tail curled underneath.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { r2 } from '../lib/geometry';

const SCALE = '#7DB35A', SHADE = '#5C9140', BARK = '#9C6B45', BARK_SHADE = '#77502F', INK = '#2E2A22', TONGUE = '#D9606E';

type P = [number, number];
/** A snake body along a chain of cubic curves: full width w for the first `hold` of its length, then tapering to a point. */
function body(curves: [P, P, P, P][], w: number, hold: number) {
  const pts: P[] = [], nrm: P[] = [];
  const n = 24, total = curves.length * n;
  curves.forEach(([a, b, c, d], ci) => {
    for (let k = ci ? 1 : 0; k <= n; k++) {
      const t = k / n, u = 1 - t;
      const x = u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0];
      const y = u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1];
      const dx = 3*u*u*(b[0]-a[0]) + 6*u*t*(c[0]-b[0]) + 3*t*t*(d[0]-c[0]);
      const dy = 3*u*u*(b[1]-a[1]) + 6*u*t*(c[1]-b[1]) + 3*t*t*(d[1]-c[1]);
      const l = Math.hypot(dx, dy) || 1, f = (ci * n + k) / total;
      const h = (f < hold ? w : w * (1 - (f - hold) / (1 - hold)) + .3) / 2;
      pts.push([x, y]); nrm.push([-dy / l * h, dx / l * h]);
    }
  });
  const L = pts.map(([x, y], i) => `${r2(x + nrm[i][0])},${r2(y + nrm[i][1])}`);
  const R = pts.map(([x, y], i) => `${r2(x - nrm[i][0])},${r2(y - nrm[i][1])}`).reverse();
  return `M${L.join(' L')} L${R.join(' L')}Z`;
}

const MUM_CURVES: [P, P, P, P][] = [
  [[35.62,26.25],[37.62,27.75],[38.37,29.5],[38.37,32.13]],
  [[38.37,32.13],[38.37,42.5],[38.37,56],[38.37,66.13]],
  [[38.37,66.13],[38.37,80.63],[44.75,85.68],[58.51,85.68]],
  [[58.51,85.68],[68.75,85.68],[72.25,85.75],[81.12,84]],
];
const BABY_CURVES: [P, P, P, P][] = [
  [[69.74,17.75],[71.74,19.25],[72.49,21],[72.49,23.63]],
  [[72.49,23.63],[72.49,34],[72.49,41.5],[72.49,47.13]],
  [[72.49,47.13],[72.49,72.75],[66.74,70.38],[60.61,66.13]],
];
// each body twice: in shade, then a slimmer main-colour body nudged up and left, so the shade shows along the lower right
const nudge = (c: [P, P, P, P][], dx: number, dy: number) => c.map(seg => seg.map(([x, y]) => [x + dx, y + dy]) as [P, P, P, P]);

/** Head pointing up and to the left, with eyes and a flicking forked tongue. */
const head = (x: number, y: number, s: number) =>
  `<path d="M${r2(x - 4.6 * s)},${r2(y - 3.4 * s)} l${r2(-2.6 * s)},${r2(-1.6 * s)} m${r2(2.6 * s)},${r2(1.6 * s)} l${r2(-1.6 * s)},${r2(-2.6 * s)}" fill="none" stroke="${TONGUE}" stroke-width="${r2(.8 * s)}" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="${r2(5.6 * s)}" ry="${r2(4.3 * s)}" transform="rotate(37 ${x} ${y})" fill="${SCALE}"/>` +
  `<path d="M${r2(x + 4.6 * s)},${r2(y - .6 * s)} C${r2(x + 3.6 * s)},${r2(y + 3 * s)} ${r2(x + .6 * s)},${r2(y + 4.4 * s)} ${r2(x - 2 * s)},${r2(y + 3.6 * s)} C${r2(x + 1.6 * s)},${r2(y + 5.4 * s)} ${r2(x + 5.6 * s)},${r2(y + 3.4 * s)} ${r2(x + 4.6 * s)},${r2(y - .6 * s)}Z" fill="${SHADE}"/>` +
  `<ellipse cx="${r2(x - 2.2 * s)}" cy="${r2(y + .2 * s)}" rx="${r2(1 * s)}" ry="${r2(1.3 * s)}" fill="${INK}"/><circle cx="${r2(x - 2.5 * s)}" cy="${r2(y - .3 * s)}" r="${r2(.35 * s)}" fill="#fff"/>` +
  `<ellipse cx="${r2(x + .8 * s)}" cy="${r2(y - 2.2 * s)}" rx="${r2(1 * s)}" ry="${r2(1.3 * s)}" fill="${INK}"/><circle cx="${r2(x + .5 * s)}" cy="${r2(y - 2.7 * s)}" r="${r2(.35 * s)}" fill="#fff"/>`;

const draw: Draw = S => [
  // both bodies, running down behind the branch
  `<path d="${body(MUM_CURVES, 7, .45)}" fill="${SHADE}"/><path d="${body(nudge(MUM_CURVES, -.7, -.8), 5.6, .45)}" fill="${SCALE}"/>` +
    `<path d="${body(BABY_CURVES, 4.8, .5)}" fill="${SHADE}"/><path d="${body(nudge(BABY_CURVES, -.5, -.6), 3.8, .5)}" fill="${SCALE}"/>`,
  // the branch along the horizontal, with a leaf at its tip
  `<path d="M95,43 C99,39.5 104,39.5 107,41.5 C104,45 99,45.5 95,43Z" fill="${SHADE}"/>` +
    `<path d="${S[0]}" fill="none" stroke="${BARK}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M20.5,52.8 C24,53.4 28,52.8 32,52.2 C50,49.2 64,46.8 77,45 C84,44 89,43.6 93,44" fill="none" stroke="${BARK_SHADE}" stroke-width="1.5" stroke-linecap="round"/>`,
  // coils wrapped round the front of the branch
  `<path d="M34.4,45.2 C38,47.6 40.4,50.6 42.2,54.6" fill="none" stroke="${SCALE}" stroke-width="6.4" stroke-linecap="round"/>` +
    `<path d="M40,53 C40.8,54.2 41.6,55.4 42.2,56.8" fill="none" stroke="${SHADE}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M69.8,40.6 C72.4,42.4 74.2,44.6 75.4,47.6" fill="none" stroke="${SCALE}" stroke-width="4.4" stroke-linecap="round"/>`,
  // heads raised above the branch
  head(33.6, 23.4, 1) + head(68.4, 16.2, .72),
  // highlights down the left-hand side of each body
  `<path d="M36.3,34 V44" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M36.3,60 C36.3,66 37,71 39,75" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M71.2,26 V36" stroke="#FFF4EE" stroke-width=".9" stroke-linecap="round" opacity=".85"/>`,
];

export default draw;
