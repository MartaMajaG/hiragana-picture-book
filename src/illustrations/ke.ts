// け (ke) illustration: two kebab skewers. Ke as in kebab.
// The left stroke and the long right stroke are the skewers, the short crossbar is a strip of pepper threaded across.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';
import { geo, r2, deg } from '../lib/geometry';

const STICK = '#D9B684', STICK_SHADE = '#B48C58';
// [fill, shade] for each kind of chunk
const MEAT: [string, string] = ['#A4603F', '#7E4530'];
const GREEN: [string, string] = ['#6FA84F', '#4F8638'];
const RED: [string, string] = ['#D9483B', '#B0342A'];
const ONION: [string, string] = ['#ECD9A8', '#CBB27A'];

/** Chunks threaded along a stroke: at each fraction f, a rounded block square to the skewer. */
function chunks(d: string, list: [number, [string, string], number][]) {
  const g = geo(d);
  return list.map(([f, [fill, shade], w]) => {
    const [x, y] = g.at(f), a = deg(g.ang(f));
    return `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${a})">` +
      `<rect x="-4.8" y="${-w / 2}" width="9.6" height="${w}" rx="2.8" fill="${fill}"/>` +
      `<path d="M-4.8,${w / 2 - 4} h9.6 v1.2 a2.8,2.8 0 0 1 -2.8,2.8 h-4 a2.8,2.8 0 0 1 -2.8,-2.8Z" fill="${shade}"/>` +
      `<rect x="-3" y="${-w / 2 + 1.6}" width="1.5" height="${r2(w * .35)}" rx=".75" fill="#FFF4EE" opacity=".8"/></g>`;
  }).join('');
}

const draw: Draw = S => [
  shadow(50, 100, 34),
  // the two skewers
  `<path d="${S[0]}" fill="none" stroke="${STICK}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="${S[2]}" fill="none" stroke="${STICK}" stroke-width="2.6" stroke-linecap="round"/>`,
  // chunks on the left skewer
  chunks(S[0], [[.14, MEAT, 16], [.31, GREEN, 15], [.48, MEAT, 16], [.65, ONION, 15]]),
  // chunks on the right skewer
  chunks(S[2], [[.34, MEAT, 17], [.46, RED, 16], [.58, MEAT, 17], [.7, ONION, 16], [.82, MEAT, 17]]),
  // strip of pepper across, along the crossbar
  `<path d="${S[1]}" fill="none" stroke="${GREEN[1]}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="${S[1]}" fill="none" stroke="${GREEN[0]}" stroke-width="3.2" stroke-linecap="round"/>` +
    `<path d="M58,38.2 C66,37.4 74,36.3 82,35.2" fill="none" stroke="#FFF4EE" stroke-width=".9" stroke-linecap="round" opacity=".7"/>`,
  // pointed tips of the skewers
  `<path d="M24.67,19.75 L23.4,15.6 L26.2,17.4Z M71.67,14.38 L70.9,10.2 L73.8,12.6Z" fill="${STICK_SHADE}"/>`,
];

export default draw;
