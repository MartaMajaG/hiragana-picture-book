// た (ta) illustration: two tadpoles swimming past a cattail. Ta as in tadpole.
// The long slanted stroke is the cattail's stem and the crossbar is its pair of leaves;
// the two strokes on the right are the tadpoles, round heads at the left and wiggly tails trailing right.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const STEM = '#7DAE5A', STEM_SHADE = '#5E8C40', CAT = '#9A6A45', CAT_SHADE = '#77502F';
const BODY = '#626A8C', SHADE = '#474E6E', INK = '#2E2A22';

/** A tadpole: round head at (x,y) turned by a degrees, then its tail path (already in place). */
const tadpole = (x: number, y: number, a: number, tail: string, tailShade: string) =>
  `<path d="${tail}" fill="${BODY}"/><path d="${tailShade}" fill="${SHADE}"/>` +
  `<g transform="translate(${x} ${y}) rotate(${a})">` +
    `<ellipse cx="0" cy="0" rx="7.6" ry="6.2" fill="${BODY}"/>` +
    `<path d="M-6.4,3.4 C-3,6.6 3.4,6.8 6.8,2.6 C6,5.8 2.8,7.4 -0.6,7.2 C-3,7 -5.2,5.6 -6.4,3.4Z" fill="${SHADE}"/>` +
    `<circle cx="-3" cy="-1.4" r="2.3" fill="#fff"/><circle cx="-3.5" cy="-1.3" r="1.35" fill="${INK}"/><circle cx="-3.9" cy="-1.8" r=".45" fill="#fff"/>` +
    `<path d="M-6.2,2.4 Q-5,3.6 -3.6,3.2" fill="none" stroke="${INK}" stroke-width=".6" stroke-linecap="round"/>` +
    `<path d="M-4.6,-4.6 C-2.6,-6 0.4,-6.2 2.6,-5.4" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round" opacity=".85"/>` +
  `</g>`;

const draw: Draw = S => [
  shadow(22, 91, 9),
  // a few short blades at the foot of the stem
  `<path d="M20.6,89.4 C18,85 14.6,82.6 11.6,82 C15,84.6 17,87.2 18.4,90Z M21.4,89.4 C23.6,85.4 26.6,83.4 29.6,83.2 C26.6,85.4 24.6,87.6 23.4,90.2Z" fill="${STEM_SHADE}"/>`,
  // cattail stem, along the long slanted stroke
  `<path d="${S[1]}" fill="none" stroke="${STEM}" stroke-width="2.8" stroke-linecap="round"/>` +
    `<path d="M44.6,27 C39,45 33,60 25,80" fill="none" stroke="${STEM_SHADE}" stroke-width="1" stroke-linecap="round"/>`,
  // a pair of leaves sprouting from the stem, along the crossbar
  `<path d="M40.6,34 C35,33.6 29,35.4 24,35.6 C29,37.6 35,37.2 40.4,35.8Z" fill="${STEM_SHADE}"/>` +
    `<path d="M40.4,34.6 C47,31.4 55,29.6 63.2,29.2 C56,32.4 47,35.6 40.4,36.2Z" fill="${STEM}"/>` +
    `<path d="M44,33.8 C50,31.8 55,30.6 59,30.1" fill="none" stroke="#FFF4EE" stroke-width=".7" stroke-linecap="round" opacity=".8"/>`,
  // the brown cattail head near the top
  `<g transform="translate(44 23.5) rotate(-72)"><rect x="-6.6" y="-3.2" width="13.2" height="6.4" rx="3.2" fill="${CAT}"/>` +
    `<path d="M-6.6,0.6 h13.2 v-0.2 a3.2,3.2 0 0 1 -3.2,2.8 h-6.8 a3.2,3.2 0 0 1 -3.2,-2.8Z" fill="${CAT_SHADE}"/>` +
    `<path d="M-4,-1.8 h5" stroke="#FFF4EE" stroke-width=".8" stroke-linecap="round" opacity=".7"/></g>`,
  // top tadpole: head at the start of the third stroke, tail flicking right and curling back
  tadpole(57.5, 53.4, -8,
    'M60,49 C68,47.4 75,47 80.6,47.8 C88.6,49 88,53.4 76,55.6 C82,53.2 83.6,51.4 80.4,51 C74,50.6 67,53 61,57.2Z',
    'M80.4,51 C83.6,51.4 82,53.2 76,55.6 C88,53.4 88.6,49 80.6,47.8 C84,49.4 84,50.6 80.4,51Z'),
  // bottom tadpole: head at the start of the last stroke, tail sweeping out to the right
  tadpole(55.4, 83, 28,
    'M59.4,85.2 C66,86.4 75,85.6 89,87.9 C77,90.8 67,94 57.8,91Z',
    'M89,87.9 C77,90.8 67,94 57.8,91 L59,89.6 C67,91.2 77,89.4 89,87.9Z'),
];

export default draw;
