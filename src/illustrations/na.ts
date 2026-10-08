// な (na) illustration: a narwhal leaping. Na as in narwhal.
// The long diagonal is its spiral tusk, rising from the head; the short top bar is the little wave crest the tusk breaks through,
// the hook at top right is a splash drop, and the last stroke is its body: tail stock rising to the flukes, the loop its curled
// round belly, and the flick at the end its flipper. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const BACK = '#7F93AE', SHADE = '#627690', SPOT = '#6A7E99', BELLY = '#E6EBF1', TUSK = '#F3E8CA', TUSK_SHADE = '#CDB98C',
  WATER = '#8ED0E2', WATER_SHADE = '#66B2C9', INK = '#2E2A22', PINK = '#EDB8B4';

const f = (n: number) => Math.round(n * 100) / 100;

// Tusk from its base at the forehead to its tip at the top of the diagonal, tapering, with spiral stripes.
const BX = 30.2, BY = 54.4, TX = 43.3, TY = 15.4, HW = 2.7;
const L = Math.hypot(TX - BX, TY - BY), UX = (TX - BX) / L, UY = (TY - BY) / L, NX = -UY, NY = UX;
const tusk = () => {
  const body = `<path d="M${f(BX + NX * HW)},${f(BY + NY * HW)} L${TX},${TY} L${f(BX - NX * HW)},${f(BY - NY * HW)}Z" fill="${TUSK}" stroke-linejoin="round"/>` +
    `<path d="M${f(BX - NX * HW)},${f(BY - NY * HW)} L${TX},${TY} L${f(BX - NX * HW * .2)},${f(BY - NY * HW * .2)}Z" fill="${TUSK_SHADE}" opacity=".55"/>`;
  let stripes = '';
  for (let t = .1; t < .9; t += .1) {
    const w = HW * (1 - t), px = BX + UX * L * t, py = BY + UY * L * t;
    stripes += `M${f(px + NX * w)},${f(py + NY * w)} L${f(px - NX * w + UX * 2.2)},${f(py - NY * w + UY * 2.2)} `;
  }
  return body + `<path d="${stripes}" stroke="${TUSK_SHADE}" stroke-width=".9" stroke-linecap="round"/>`;
};

// Body: round head at the foot of the tusk, chubby belly over the loop, tail stock rising up the last stroke.
const BODY =
  'M29,53.2 C38,51.5 46,56 53,61.5 C58,65.5 62,64 63.5,58 C64.4,54 64.6,50.5 65,47 L73,47 C73.4,53 74.3,60 76,67 C78.5,78 75,90 62,94 C52,96.5 38,96 29,91.5 C21,87.5 17.5,79 18.5,70.5 C19.3,62 23,55 29,53.2Z';

const draw: Draw = () => [
  // the wave crest the tusk breaks through (first stroke), curling over at its right end
  `<path d="M19.6,31 C28,31 37,29.6 45,27.2 C49,26 51.4,24 51,21.4 C50.6,18 53.6,15.8 57,16.4 C61.2,17.2 62.6,22 60.2,25.6 C57,30 49,32 40,33 C32,33.8 25,33.4 19.6,31Z" fill="${WATER}"/>` +
    `<path d="M19.6,31 C28,32 38,31 47,29 C53,27.6 58.6,26 60.2,25.6 C57,30 49,32 40,33 C32,33.8 25,33.4 19.6,31Z" fill="${WATER_SHADE}"/>` +
    `<path d="M53.4,21.4 C53.4,19.6 55,18.8 56.4,19.2 C57.8,19.6 58.2,21.6 57.2,23 C56.2,24.2 54.4,23.6 53.4,21.4Z" fill="${WATER_SHADE}"/>` +
    `<path d="M24,29.6 C31,29.4 38,28.2 44.6,26.2 M51.6,19.6 C52.4,17.6 54.6,16.8 56.8,17.4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>`,
  // flipper, along the flick at the end of the last stroke
  `<path d="M62,81 C69,80.5 78,83 85,86.5 C86.5,87.5 85.8,89.6 84,89.6 C76,90 68,89 61,87.5Z" fill="${SHADE}"/>`,
  // flukes at the top of the tail stock
  `<path d="M69,49 C66,43 61,40 56,40.5 C58.5,43 60.5,47 63,49 C65,50.5 67,50.5 69,49Z" fill="${BACK}"/>` +
    `<path d="M69,49 C72,43 77,40 82,40.5 C79.5,43 77.5,47 75,49 C73,50.5 71,50.5 69,49Z" fill="${SHADE}"/>`,
  // body with pale belly, shade down the tail and rump, mottled spots on the back
  `<path d="${BODY}" fill="${BACK}"/>` +
    `<path d="M19.5,76 C24,84 34,88.5 46,88.5 C56,88.5 66,86 73,80 C74,86 70,92 62,94 C52,96.5 38,96 29,91.5 C23,88.5 20,82.5 19.5,76Z" fill="${BELLY}"/>` +
    `<path d="M71,47 L73,47 C73.4,53 74.3,60 76,67 C78.5,78 75,90 62,94 C68,86 72,76 71,64 C70.6,58 70.6,52 71,47Z" fill="${SHADE}"/>` +
    `<g fill="${SPOT}"><ellipse cx="44" cy="60.5" rx="2" ry="1.3"/><ellipse cx="50" cy="66" rx="1.6" ry="1.1"/><ellipse cx="40" cy="67" rx="1.3" ry=".9"/><ellipse cx="57" cy="71" rx="1.9" ry="1.2"/><ellipse cx="66.5" cy="60" rx="1.2" ry="1.6"/><ellipse cx="67" cy="70" rx="1.5" ry="1.1"/><ellipse cx="62" cy="77" rx="1.2" ry=".9"/><ellipse cx="68" cy="53" rx="1" ry="1.3"/></g>`,
  // the spiral tusk (second stroke)
  tusk(),
  // splash drop flicked off the flukes (third stroke)
  `<g fill="${WATER}"><circle cx="73.2" cy="23.7" r=".9"/><circle cx="77.6" cy="25.4" r="1.2"/><circle cx="82" cy="27.8" r="1.5"/></g>` +
    `<path d="M86.6,31 C84.4,34 83.2,36 83.2,37.6 C83.2,39.6 84.8,40.8 86.4,40.8 C88,40.8 89.6,39.6 89.6,37.6 C89.6,36 88.6,34 86.6,31Z" fill="${WATER}"/>` +
    `<path d="M85,37.4 C85,36.6 85.4,35.8 85.9,35.2" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round"/>`,
  // face: eye, cheek, little smile
  `<ellipse cx="30.5" cy="66" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="30" cy="65.2" r=".6" fill="#fff"/>` +
    `<circle cx="34.8" cy="71.5" r="2.4" fill="${PINK}" opacity=".8"/>` +
    `<path d="M21.5,72.5 Q24.5,75.5 28,73.5" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round"/>`,
  // highlights on the head and back
  `<path d="M23,62 C24.5,58 27,55.6 30.5,54.8 M40,55.6 C44,56.8 48,59 51,61.2" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>`,
];

export default draw;
