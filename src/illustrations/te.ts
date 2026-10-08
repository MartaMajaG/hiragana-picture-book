// て (te) illustration: an old rotary telephone with its handset lifted. Te as in telephone.
// The top stroke is the handset, and the big curve dropping from its end is the curly cord
// swinging down to the telephone sitting at the bottom right.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const RED = '#D8483C', SHADE = '#AE3329', CREAM = '#F4E6D0', CREAM_SHADE = '#DCC9AC';

// the curve of the stroke after the handset: the cord
const CORD = 'M79.12,20.75c-17.89,3.19-33.78,19.12-33.78,37.62c0,20.5,17.91,30.25,35.16,30.25';

const draw: Draw = () => [
  shadow(93, 99.4, 17),
  // the telephone: body, shaded on the right, with the cradle on top
  `<path d="M83.4,78 L102.6,78 C104.6,78 105.6,79 106,81 L108,96 C108.2,98 107,99 105,99 L81,99 C79,99 77.8,98 78,96 L80,81 C80.4,79 81.4,78 83.4,78Z" fill="${RED}"/>` +
    `<path d="M101,78 L102.6,78 C104.6,78 105.6,79 106,81 L108,96 C108.2,98 107,99 105,99 L101.6,99 C103.6,93 103.4,85 101,78Z" fill="${SHADE}"/>` +
    `<path d="M85.4,78.4 L87,74.4 L99,74.4 L100.6,78.4Z" fill="${SHADE}"/><path d="M83.2,74.6 C83.2,71.4 88.4,71.4 88.4,74.6Z M97.6,74.6 C97.6,71.4 102.8,71.4 102.8,74.6Z" fill="${RED}"/>` +
    `<path d="M84,80.6 C83,85 82.4,89 82,92" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>`,
  // the rotary dial
  `<circle cx="93" cy="89" r="7.4" fill="${CREAM}"/><path d="M99.6,85.8 A7.4,7.4 0 0 1 88,94.4 A8.4,8.4 0 0 0 99.6,85.8Z" fill="${CREAM_SHADE}"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      const a = (-150 + i * 34) * Math.PI / 180;
      return `<circle cx="${(93 + Math.cos(a) * 4.9).toFixed(2)}" cy="${(89 + Math.sin(a) * 4.9).toFixed(2)}" r="1.1" fill="${SHADE}"/>`;
    }).join('') +
    `<circle cx="93" cy="89" r="2" fill="${RED}"/>`,
  // the curly cord, swinging down from the handset to the phone
  `<path d="${CORD}" fill="none" stroke="${RED}" stroke-width="3.2" stroke-linecap="round"/>` +
    `<path d="${CORD}" fill="none" stroke="${SHADE}" stroke-width="3.2" stroke-dasharray=".9 1.5"/>`,
  // the handset along the top stroke: a grip with an earpiece and a mouthpiece hanging below each end
  `<g transform="translate(50 26) rotate(-9)">` +
    `<path d="M-35,-3 C-35,-5 -33.6,-6 -31.6,-6 L31.6,-6 C33.6,-6 35,-5 35,-3 L35,0 L-35,0Z" fill="${RED}"/>` +
    `<path d="M-35,-1 L-21,-1 L-22.6,6.4 C-23,8 -24,8.6 -25.6,8.6 L-30.4,8.6 C-32,8.6 -33,8 -33.4,6.4Z M35,-1 L21,-1 L22.6,6.4 C23,8 24,8.6 25.6,8.6 L30.4,8.6 C32,8.6 33,8 33.4,6.4Z" fill="${RED}"/>` +
    `<path d="M-21,-1 L-22.6,6.4 C-23,8 -24,8.6 -25.6,8.6 L-27,8.6 C-25,6 -24.4,2 -24.6,-1Z M35,-1 L35,-3 L35,0 L33.4,6.4 C33,8 32,8.6 30.4,8.6 L29,8.6 C31,6 31.6,2 31.4,-1Z" fill="${SHADE}"/>` +
    `<path d="M-21,-1 L21,-1 L21,0 C10,1.4 -10,1.4 -21,0Z" fill="${SHADE}"/>` +
    `<path d="M-30,-4.4 L26,-4.4" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".85"/>` +
  `</g>`,
];

export default draw;
