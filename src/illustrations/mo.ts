// も (mo) illustration: a fluffy moth resting on a curling stem. Mo as in moth.
// The long stroke is the stem: its top is the moth's fuzzy body, then it runs down, curls round at the bottom
// and up into a leaf. The top crossbar is the moth's big upper wings, the lower crossbar its smaller hind wings.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { r2 } from '../lib/geometry';

const WING = '#F1E4CC', WING_SHADE = '#DCC6A2', LILAC = '#B7A3C7', BODY = '#B89572', BODY_SHADE = '#977455',
  STEM = '#8FA878', STEM_SHADE = '#728C5E', INK = '#2E2A22';

/** A fluffy round tuft: a disc ringed with little bumps. */
const fuzz = (cx: number, cy: number, r: number, b: number, fill: string) => {
  let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * Math.PI * 2;
    out += `<circle cx="${r2(cx + Math.cos(a) * r)}" cy="${r2(cy + Math.sin(a) * r)}" r="${b}" fill="${fill}"/>`;
  }
  return out;
};

type P = [number, number];
/** A feathery antenna along a cubic curve: a thin shaft with short barbs combed forward on both sides, shorter towards the tip. */
const feather = (p0: P, p1: P, p2: P, p3: P) => {
  const at = (t: number, i: 0 | 1) => (1 - t) ** 3 * p0[i] + 3 * (1 - t) ** 2 * t * p1[i] + 3 * (1 - t) * t * t * p2[i] + t ** 3 * p3[i];
  const tan = (t: number, i: 0 | 1) => 3 * (1 - t) ** 2 * (p1[i] - p0[i]) + 6 * (1 - t) * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]);
  let barbs = '';
  for (let k = 1; k <= 9; k++) {
    const t = 0.12 + k * 0.095, x = at(t, 0), y = at(t, 1), a = Math.atan2(tan(t, 1), tan(t, 0)), len = 2.8 * (1 - t * 0.55);
    for (const side of [1, -1]) {
      const b = a + side * 0.9;
      barbs += `M${r2(x)},${r2(y)} l${r2(Math.cos(b) * len)},${r2(Math.sin(b) * len)} `;
    }
  }
  return `<path d="${barbs}" fill="none" stroke="${BODY}" stroke-width=".8" stroke-linecap="round"/>` +
    `<path d="M${p0} C${p1} ${p2} ${p3}" fill="none" stroke="${BODY_SHADE}" stroke-width="1.1" stroke-linecap="round"/>`;
};

const draw: Draw = () => [
  // stem down the long stroke, curling round at the bottom and up into a leaf
  `<path d="M45.5,40 C44.6,50 43.6,58 43,65 C40.4,84.8 42.2,94.7 60,94.7 C80.2,94.7 88.6,81.6 80,59" fill="none" stroke="${STEM}" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M44.6,91.2 C46.6,94.4 52,95.6 60,95.6 C74,95.6 84,88 85.4,76" fill="none" stroke="${STEM_SHADE}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M80,59 C74,56 71,49 73,42 C80,44 84,50 82.4,58Z" fill="${STEM}"/>` +
    `<path d="M80,59 C84,54 84,48 73,42 C80,46 82,52 80,59Z" fill="${STEM_SHADE}"/>`,
  // hind wings along the lower crossbar
  `<path d="M45,46 C38,44.6 29.6,47 26.4,52.6 C24,57.6 28,63.6 35,63 C40.6,62.4 44,57.6 45.2,52Z" fill="${WING}"/>` +
    `<path d="M26.4,57 C28,61.8 31.6,63.4 35,63 C40.6,62.4 44,57.6 45.2,52 C41,58.6 34,60.6 26.4,57Z" fill="${WING_SHADE}"/>` +
    `<path d="M48,46 C55,44.6 63.4,46.4 66.4,52 C68.6,57 64.6,62.6 57.6,62 C52,61.4 48.6,57 47.8,52Z" fill="${WING}"/>` +
    `<path d="M66.4,52 C68.6,57 64.6,62.6 57.6,62 C52,61.4 48.6,57 47.8,52 C52,57.6 60,59 66.4,52Z" fill="${WING_SHADE}"/>`,
  // big upper wings along the top crossbar
  `<path d="M47,29 C39,20.6 26,19.6 20.6,25.6 C16.6,31 20.6,41.6 29,44.6 C36,46.8 43,45 46.6,41Z" fill="${WING}"/>` +
    `<path d="M18.8,32 C20.4,38 24,42.6 29,44.6 C36,46.8 43,45 46.6,41 C38,44 26,41 18.8,32Z" fill="${WING_SHADE}"/>` +
    `<path d="M48.6,29 C56.6,20.4 70,19 75.6,25 C79.8,30.6 75.8,41 67.4,44 C60.4,46.4 53,44.6 49,40.6Z" fill="${WING}"/>` +
    `<path d="M77,31 C76.6,37 72.6,42 67.4,44 C60.4,46.4 53,44.6 49,40.6 C58,43.4 70,40 77,31Z" fill="${WING_SHADE}"/>`,
  // one soft eyespot per wing
  `<circle cx="31" cy="32.6" r="4.4" fill="${LILAC}"/><circle cx="31" cy="32.6" r="1.8" fill="#6F5C80"/>` +
    `<circle cx="64.6" cy="31.6" r="4.4" fill="${LILAC}"/><circle cx="64.6" cy="31.6" r="1.8" fill="#6F5C80"/>` +
    `<circle cx="34.6" cy="54.6" r="2.8" fill="${LILAC}"/><circle cx="58.4" cy="54" r="2.8" fill="${LILAC}"/>`,
  // plump fuzzy body resting on the stem, with soft bands and a fluffy collar
  `<path d="M40.4,34 C40,44 40.6,55 44.2,60.6 C46,63.2 49,62.6 50.2,59.4 C52.4,53 53.8,42 53.2,33Z" fill="${BODY}"/>` +
    `<path d="M50.6,34 C52.4,42 51.6,53 49.6,58.4 C48.8,60.8 47.4,62 45.8,61.8 C48.2,63 49.6,61.8 50.2,59.4 C52.4,53 53.8,42 53.2,33Z" fill="${BODY_SHADE}"/>` +
    `<path d="M41,42.4 Q46.6,44.6 52.8,42.6 M41.4,48.6 Q46.4,50.6 52,48.8 M42.6,54.6 Q46.4,56.2 50.6,54.8" fill="none" stroke="${BODY_SHADE}" stroke-width="1.2" stroke-linecap="round"/>` +
    fuzz(47, 31, 5, 2.2, WING) + `<path d="M52.4,28.4 C54,31.6 53,35 50.2,36.6 C51.6,34.2 52.2,31.4 52.4,28.4Z" fill="${WING_SHADE}"/>`,
  // feathery antennae, combed on both sides
  feather([46.4, 16.4], [44, 11.6], [40.6, 7.4], [36.4, 5.4]) + feather([51.6, 16.4], [54, 11.6], [57.4, 7.4], [61.6, 5.4]),
  // fluffy head with a friendly face
  `<circle cx="49" cy="22" r="6.8" fill="${BODY}"/>` +
    `<path d="M53.6,17 C56.4,20.6 56.2,25.6 53,28 C51,29.4 48.6,29.4 46.8,28.6 C51,27 54,22.6 53.6,17Z" fill="${BODY_SHADE}"/>` +
    `<ellipse cx="46.4" cy="21.4" rx="1.3" ry="1.8" fill="${INK}"/><circle cx="46" cy="20.8" r=".45" fill="#fff"/>` +
    `<ellipse cx="51.6" cy="21.4" rx="1.3" ry="1.8" fill="${INK}"/><circle cx="51.2" cy="20.8" r=".45" fill="#fff"/>` +
    `<ellipse cx="44.8" cy="24.8" rx="1.5" ry="1" fill="#EDB8B4"/><ellipse cx="53.2" cy="24.8" rx="1.5" ry="1" fill="#EDB8B4"/>` +
    `<path d="M48,25.4 Q49,26.4 50,25.4" fill="none" stroke="${INK}" stroke-width=".6" stroke-linecap="round"/>`,
  // highlights on the wings and head
  `<path d="M23.6,30.6 C24.6,26.8 28,24.2 32.4,23.8" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M57.4,24.8 C61,22.6 65.6,22 69.4,23" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/>` +
    `<path d="M29,51.4 C31,48.8 34,47.6 37.4,47.4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".9"/>` +
    `<path d="M44,18.8 C44.8,17 46.2,16 48,15.8" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".8"/>`,
];

export default draw;
