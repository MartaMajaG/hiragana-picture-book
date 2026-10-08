// そ (so) illustration: sewing, a needle pulling its thread off a cotton reel. So as in sewing.
// The whole zigzag stroke is the thread: it starts at the reel at the top, zigzags down,
// and ends in the eye of the needle, which points off to the right where the stroke finishes.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const THREAD = '#D9483B', THREAD_SHADE = '#B0342A', WOOD = '#E2C08D', WOOD_SHADE = '#BF9A62', STEEL = '#BAC4D0', STEEL_SHADE = '#8E9AAB';

const draw: Draw = S => [
  // cotton reel: wooden ends with red thread wound between
  `<rect x="23.4" y="9" width="11.2" height="15" fill="${THREAD}"/>` +
    `<rect x="30.6" y="9" width="4" height="15" fill="${THREAD_SHADE}"/>` +
    `<path d="M24,12 H34 M24,15 H34 M24,18 H34 M24,21 H34" stroke="${THREAD_SHADE}" stroke-width=".6" opacity=".7"/>` +
    `<rect x="20.4" y="5.6" width="17.2" height="4" rx="1.6" fill="${WOOD}"/><rect x="20.4" y="23.4" width="17.2" height="4" rx="1.6" fill="${WOOD}"/>` +
    `<path d="M32,5.6 H36 A1.6,1.6 0 0 1 37.6,7.2 V8 A1.6,1.6 0 0 1 36,9.6 H32Z M32,23.4 H36 A1.6,1.6 0 0 1 37.6,25 V25.8 A1.6,1.6 0 0 1 36,27.4 H32Z" fill="${WOOD_SHADE}"/>`,
  // the thread, pulled off the reel and zigzagging along the stroke
  `<path d="M34,20.6 C35.6,21 37,21.2 38.4,22" fill="none" stroke="${THREAD}" stroke-width="2.3" stroke-linecap="round"/>` +
    `<path d="${S[0]}" fill="none" stroke="${THREAD}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  // the needle at the end of the stroke, with the loose end of thread through its eye
  `<g transform="translate(78.02 90.5) rotate(-10.7) scale(1.3)">` +
    `<path d="M0,0 C-2.5,2.6 -5.5,4.6 -9,5.2" fill="none" stroke="${THREAD}" stroke-width="1.55" stroke-linecap="round"/>` +
    `<path d="M-2.6,-1.5 L12,-1.1 L19,0 L12,1.1 L-2.6,1.5 A1.5,1.5 0 0 1 -2.6,-1.5Z" fill="${STEEL}"/>` +
    `<path d="M-2.6,.4 L12,.4 L19,0 L12,1.1 L-2.6,1.5 A1.5,1.5 0 0 1 -4.1,0Z" fill="${STEEL_SHADE}"/>` +
    `<rect x="-1.8" y="-.45" width="3.4" height=".9" rx=".45" fill="${THREAD_SHADE}"/>` +
    `<path d="M3,-.7 H11" stroke="#fff" stroke-width=".5" stroke-linecap="round"/></g>`,
  // highlight on the reel
  `<path d="M25.4,11 V21.5" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M22.4,6.8 H27" stroke="#FFF4EE" stroke-width=".9" stroke-linecap="round"/>`,
];

export default draw;
