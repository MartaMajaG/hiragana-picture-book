// す (su) illustration: a ladle of soup hanging on a kitchen rail. Su as in soup.
// The horizontal is the rail, the vertical is the ladle's handle hung on a peg, the loop is the round bowl full of soup,
// and the tail at the bottom is the soup dripping out of it.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const WOOD = '#C99A5E', WOOD_SHADE = '#A37741', STEEL = '#BAC4D0', STEEL_SHADE = '#8E9AAB', SOUP = '#E8743B', SOUP_SHADE = '#C4592A';

// soup drops along the bottom sweep: [x, y, size]
const DROPS: [number, number, number][] = [[61.2, 79.5, 2.3], [57.2, 87.4, 2.1], [51.8, 93, 1.9], [46.2, 97.8, 1.7]];
const drop = ([x, y, r]: [number, number, number]) =>
  `<path d="M${x},${y - r * 2.1} C${x + r * .5},${y - r} ${x + r},${y - r * .5} ${x + r},${y + r * .1} A${r},${r} 0 0 1 ${x - r},${y + r * .1} C${x - r},${y - r * .5} ${x - r * .5},${y - r} ${x},${y - r * 2.1}Z" fill="${SOUP}"/>`;

const draw: Draw = S => [
  // the rail along the horizontal, with a bracket at each end
  `<path d="${S[0]}" fill="none" stroke="${WOOD}" stroke-width="4.6" stroke-linecap="round"/>` +
    `<path d="M20,39.6 C23,40 26.5,39.5 30,38.8 C46,35.4 66,33.4 76.6,32.2 C83,31.5 87.6,31.6 92,32.2" fill="none" stroke="${WOOD_SHADE}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<rect x="17" y="33.2" width="4.2" height="8.6" rx="1.4" fill="${STEEL_SHADE}"/><rect x="87.4" y="27.4" width="4.2" height="8.6" rx="1.4" fill="${STEEL_SHADE}"/>`,
  // the handle hung on a peg in the rail, down to the bowl, with a wider grip at the top
  `<path d="M57.62,13.38 C59.62,14.88 60.37,16.63 60.37,19.26 C60.37,29.64 60.37,50 60.37,56" fill="none" stroke="${STEEL}" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M58.6,14.6 C60.4,16 61.2,18 61.2,21 L61.2,29" fill="none" stroke="${STEEL}" stroke-width="3.4" stroke-linecap="round"/>` +
    `<path d="M62.3,21 V29 M61.8,37.5 V55" stroke="${STEEL_SHADE}" stroke-width="1.1" stroke-linecap="round"/>` +
    `<circle cx="60.4" cy="33.4" r="1.5" fill="${WOOD_SHADE}"/>`,
  // the bowl, a deep round cup along the loop
  `<path d="M42.7,56.5 C42.7,66.5 47.5,73.4 53.7,73.4 C59.9,73.4 64.7,66.5 64.7,56.5Z" fill="${STEEL}"/>` +
    `<path d="M60.5,57 C61.5,64.5 59.5,70.5 54.5,73.4 C60.4,73.3 64.7,66.5 64.7,56.5Z" fill="${STEEL_SHADE}"/>` +
    `<ellipse cx="53.7" cy="56.5" rx="11" ry="3.6" fill="${STEEL_SHADE}"/>`,
  // soup filling the bowl, running over the rim and dripping away along the bottom sweep
  `<ellipse cx="53.7" cy="56.7" rx="9.8" ry="2.8" fill="${SOUP}"/>` +
    `<path d="M47,57.9 C51,59 57,59 60.6,57.6" fill="none" stroke="${SOUP_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M62.6,57.6 C63.6,60 63.4,64 62.9,66.5 C62.6,68.4 64.4,68.6 64.3,66.5 C64.2,63.5 64.6,60 64,57.4Z" fill="${SOUP}"/>` +
    DROPS.map(drop).join(''),
  // highlights on the bowl and handle
  `<path d="M45.5,61 C46.2,65.5 48.2,69 51,70.8" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".9"/>` +
    `<path d="M59.2,38 V50" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".8"/>` +
    `<circle cx="50.8" cy="55.8" r=".9" fill="#F7B089"/>`,
];

export default draw;
