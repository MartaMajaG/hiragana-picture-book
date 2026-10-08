// う (u) illustration: a little ghost going "ooooo".
// The long curve is the ghost's head and wispy tail, the short stroke on top is its wail.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SHEET = '#F3F1FA', SHADE = '#D5D0E8', INK = '#2E2A38';

const draw: Draw = () => [
  shadow(56, 104, 18),
  // the wail, drawn along the first stroke
  `<path d="M42,17 q3.5,-3 7,0 t7,0 t6.5,0" fill="none" stroke="#9C92C4" stroke-width="2" stroke-linecap="round"/>`,
  // ghost body: round head top right, arm reaching left, tail sweeping down to the bottom left
  `<path d="M57,35 C71,35 77,47 75,60 C73,74 63,84 53,92 C50,94.5 47,97.5 45,99 C43,94 44,90 40,86 C36,82 37,75 39,68 C40.5,63 40,57 41,52 C37,50.5 33,49 31,46.5 C29.5,44.3 32,41.8 35,42.6 C38.5,43.6 41,44 43,43 C46,38 51,35 57,35Z" fill="${SHEET}"/>` +
    `<path d="M66,38 C74,42 77,51 75,60 C73,74 63,84 53,92 C50,94.5 47,97.5 45,99 C59,86 70,72 66,38Z" fill="${SHADE}"/>`,
  // face with an "oo" mouth
  `<ellipse cx="54" cy="52" rx="2.1" ry="3" fill="${INK}"/><ellipse cx="63" cy="51" rx="2.1" ry="3" fill="${INK}"/>` +
    `<circle cx="53.4" cy="51" r=".7" fill="#fff"/><circle cx="62.4" cy="50" r=".7" fill="#fff"/>` +
    `<ellipse cx="58.8" cy="61" rx="3" ry="3.8" fill="${INK}"/>`,
  // highlight
  `<path d="M49.5,44 C51,40.5 54,38.8 57.5,38.6" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`,
];

export default draw;
