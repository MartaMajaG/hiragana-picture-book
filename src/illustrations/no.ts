// の (no) illustration: a round "no" sign on a post. No as in "No!".
// The single stroke's straight start is the slash across the sign, and its big sweep round is the red ring.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const RED = '#D9483B', RED_SHADE = '#B0342A', FACE = '#FBF7F0', POST = '#8E97A6', POST_SHADE = '#6F7888';

const CX = 55, CY = 56;

const draw: Draw = () => [
  shadow(CX, 105, 14),
  // the post
  `<rect x="${CX - 3}" y="84" width="6" height="21" rx="1" fill="${POST}"/><rect x="${CX + 0.8}" y="84" width="2.2" height="21" fill="${POST_SHADE}"/>`,
  // the sign's white face and outer edge
  `<circle cx="${CX}" cy="${CY}" r="41" fill="${FACE}"/>`,
  // the slash across, along the straight start of the stroke
  `<path d="M57,23 L35.5,88" stroke="${RED}" stroke-width="9"/>` +
    `<path d="M59.2,23.7 L37.7,88.7" stroke="${RED_SHADE}" stroke-width="2.6"/>`,
  // the red ring, along the big sweep, shaded on the lower right
  `<circle cx="${CX}" cy="${CY}" r="35" fill="none" stroke="${RED}" stroke-width="10"/>` +
    `<path d="M81.48,26.02 A40,40 0 1 1 25.02,82.48 A40,40 0 0 0 81.48,26.02Z" fill="${RED_SHADE}"/>`,
  // highlight on the ring
  `<path d="M${CX - 33},${CY - 12} A35,35 0 0 1 ${CX - 12},${CY - 33}" fill="none" stroke="#FFF4EE" stroke-width="1.6" stroke-linecap="round"/>`,
];

export default draw;
