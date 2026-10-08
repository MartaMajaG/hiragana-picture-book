// さ (sa) illustration: a saw biting into a log. Sa as in saw.
// The line across the top is the saw's wooden crossbar handle, the long slanted stroke is the grip running down into the
// steel toothed blade, its little hook is the tip of the blade buried in the cut, and the bottom curve is the round end of the log.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const WOOD = '#D99A48', WOOD_SHADE = '#B07330', STEEL = '#BAC4D0', STEEL_SHADE = '#8E9AAB';
const BARK = '#8A5A3A', BARK_SHADE = '#6B4229', FACE = '#F0CF94', RING = '#CF9F5E', INK = '#2E2A22';

// the blade is drawn in its own frame: x runs from the handle down to the tip, +y is the toothed (lower) edge
const BLADE_AT = 'translate(53 35) rotate(49.7)';
const TEETH = (() => {
  let d = 'M0,8.4';
  for (let x = 0; x < 34; x += 3) {
    const e = 8.4 - x * .06;
    d += ` L${(x + 1.5).toFixed(2)},${(e + 3).toFixed(2)} L${(x + 3).toFixed(2)},${(e - .18).toFixed(2)}`;
  }
  return d + ' L34,-5 L0,-5.6Z';
})();

// the log lies with its round end facing us and its body running back to the right
const LOG_BODY = 'M49.5,56.4 L76,51.1 A18,18 0 0 1 83,86.3 L56.5,91.6Z';

const draw: Draw = S => [
  shadow(66, 94, 34),
  // the steel blade with its teeth, running down into the log
  `<g transform="${BLADE_AT}"><path d="${TEETH}" fill="${STEEL}"/>` +
    `<path d="M0,-5.6 L34,-5 L34,-2.6 L0,-3.2Z" fill="${STEEL_SHADE}"/>` +
    `<path d="M4,1.4 L22,1" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".85"/></g>`,
  // the log: bark body going back, then the round cut end with its rings
  `<path d="${LOG_BODY}" fill="${BARK}"/>` +
    `<path d="M56.5,91.6 L83,86.3 A18,18 0 0 0 96.2,75.4 C90,81.5 74,85.4 58,88Z" fill="${BARK_SHADE}"/>` +
    `<path d="M66,60 L76,58 M72,69 L86,66.2 M68,78 L78,76" stroke="${BARK_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    `<circle cx="53" cy="73.6" r="18.8" fill="${BARK}"/>` +
    `<circle cx="53" cy="73.6" r="15.8" fill="${FACE}"/>` +
    `<circle cx="53" cy="73.6" r="10.8" fill="none" stroke="${RING}" stroke-width="1"/>` +
    `<circle cx="53" cy="73.6" r="5.8" fill="none" stroke="${RING}" stroke-width="1"/>` +
    `<circle cx="53" cy="73.6" r="1.4" fill="${RING}"/>`,
  // the cut where the blade bites in, with a few crumbs of sawdust
  `<path d="M66.4,53.4 L70.4,52.6" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>` +
    `<circle cx="63.6" cy="53.4" r=".9" fill="${FACE}"/><circle cx="61.4" cy="54.2" r=".7" fill="${FACE}"/><circle cx="73.4" cy="51.4" r=".8" fill="${FACE}"/>`,
  // the wooden grip down the top of the slanted stroke, fixed to the blade with a steel ferrule
  `<path d="M42.6,15.2 L53,35.4" stroke="${WOOD}" stroke-width="6.4" stroke-linecap="round"/>` +
    `<path d="M45.2,15.8 L54.6,34" stroke="${WOOD_SHADE}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M51.4,33.6 L55.6,36.6" stroke="${STEEL_SHADE}" stroke-width="5.4" stroke-linecap="butt"/>`,
  // the crossbar handle along the top line
  `<path d="${S[0]}" fill="none" stroke="${WOOD}" stroke-width="5.4" stroke-linecap="round"/>` +
    `<path d="M29.5,42.4 C32,43 34,43.2 36,43 C45,41.6 64,35.4 70.5,32.4 C72.6,31.4 74.4,30.2 76.6,28.8" fill="none" stroke="${WOOD_SHADE}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<circle cx="53" cy="35.3" r="1.5" fill="${STEEL_SHADE}"/>`,
  // highlights on the handle and the bark
  `<path d="M31,38.8 C33,39.4 35,39.4 37,39.1 M44.6,37.4 C50,36 58,33.6 63,31.8" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M41.8,18.6 L47.6,29.6" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M39.5,68 C40.5,63.5 43.5,60 47,58" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>`,
];

export default draw;
