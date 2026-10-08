// り (ri) illustration: two fishing rods standing side by side, the tall one with a big red reel and a fish on the line. Ri as in reel.
// The short left stroke is a short bamboo rod propped up, its little flick the crank handle of its small reel;
// the long right stroke is the tall blue rod: its butt and cork grip curve along the bottom-left of the stroke,
// the shaft runs straight up and the tip bows over at the top where a fish tugs on the line.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const ROD = '#3F6FB0', ROD_SHADE = '#2C5390', BAMBOO = '#C9963F', BAMBOO_SHADE = '#A07228', CORK = '#C98E5E';
const REEL = '#D9483B', REEL_SHADE = '#B0342A', METAL = '#B9C2CC', FISH = '#E58A3A', FISH_SHADE = '#C46A22';
const INK = '#2E2A22', LIGHT = '#FFF4EE';

/** A reel: round red housing on (x, y), radius r, with a silver spool hub. */
const reel = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${REEL}"/>` +
  `<path d="M${x + r * .7},${y - r * .7} A${r},${r} 0 0 1 ${x - r * .7},${y + r * .7} A${r * .8},${r * .8} 0 0 0 ${x + r * .7},${y - r * .7}Z" fill="${REEL_SHADE}"/>` +
  `<circle cx="${x}" cy="${y}" r="${r * .5}" fill="${METAL}"/>` +
  `<circle cx="${x}" cy="${y}" r="${r * .18}" fill="${INK}" opacity=".6"/>` +
  `<path d="M${x - r * .75},${y - r * .25} A${r * .8},${r * .8} 0 0 1 ${x - r * .2},${y - r * .78}" fill="none" stroke="${LIGHT}" stroke-width=".9" stroke-linecap="round"/>`;

const draw: Draw = S => [
  shadow(50, 95, 22),
  // fishing line from the tall rod's tip down to the fish
  `<path d="M69.4,18.8 C64,26 60,33 57.5,40.5" fill="none" stroke="${INK}" stroke-width=".6" opacity=".7"/>`,
  // the fish hanging on the line, head up, tail flapping
  `<path d="M57.4,57 L52.5,64.5 L59,62.5 L62.5,64Z" fill="${FISH_SHADE}"/>` +
    `<ellipse cx="57.4" cy="50" rx="5.2" ry="9.6" transform="rotate(12 57.4 50)" fill="${FISH}"/>` +
    `<path d="M62.2,46 C63.3,52 61.5,57 58.6,59.3 C60,55 60.5,50 60.4,44.5Z" fill="${FISH_SHADE}"/>` +
    `<path d="M53.3,46.5 C53.6,44 54.6,42.6 55.8,41.8" fill="none" stroke="${LIGHT}" stroke-width=".9" stroke-linecap="round"/>` +
    `<circle cx="56" cy="44.5" r="1.1" fill="${INK}"/><circle cx="55.7" cy="44.2" r=".35" fill="#fff"/>`,
  // the short bamboo rod along the short stroke, its cork butt carrying on down to the ground
  `<path d="M38.75,25.25c1.25,1.5,2.24,4.03,1.62,6.62c-2.88,12.13-6.29,29.65-4.25,42.38" fill="none" stroke="${BAMBOO}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M39.9,29 c0.6,1.5,0.6,2.5,0.3,3.6 M38.3,46 l-.5,3 M36.8,60 l-.2,3" fill="none" stroke="${BAMBOO_SHADE}" stroke-width="3" stroke-linecap="butt"/>` +
    `<path d="M36.1,72 C36.2,80 36.4,88 36.6,94" fill="none" stroke="${CORK}" stroke-width="4.2" stroke-linecap="round"/>`,
  // its small reel, the flick being the crank handle
  reel(38, 80.5, 4.2) +
    `<path d="M38,80.5 C38.8,75 39.8,71 41.74,68" fill="none" stroke="${METAL}" stroke-width="1.7" stroke-linecap="round"/>` +
    `<ellipse cx="41.9" cy="67.6" rx="1.3" ry="1.9" transform="rotate(30 41.9 67.6)" fill="${INK}"/>`,
  // the tall rod along the long stroke, tip bowing over with the fish's weight
  `<path d="${S[1]}" fill="none" stroke="${ROD}" stroke-width="3.2" stroke-linecap="round"/>` +
    `<path d="M73.6,30 V61 C73.6,70 72.2,77 69.2,83" fill="none" stroke="${ROD_SHADE}" stroke-width=".9" stroke-linecap="round"/>` +
    `<path d="M71.3,30 V50" fill="none" stroke="${LIGHT}" stroke-width=".7" stroke-linecap="round" opacity=".8"/>` +
    // line guides along the shaft
    `<path d="M72.25,36 h2.6 M72.25,48 h2.6 M72.25,59 h2.6" fill="none" stroke="${METAL}" stroke-width="1.1" stroke-linecap="round"/>`,
  // its cork grip down the curve to the butt on the ground
  `<path d="M67.4,84.4 C65.3,88.3 62.8,91.2 59.63,94.12" fill="none" stroke="${CORK}" stroke-width="4.4" stroke-linecap="round"/>` +
    `<path d="M65.6,85.5 C64,88.4 62,90.7 59.8,92.8" fill="none" stroke="${LIGHT}" stroke-width=".8" stroke-linecap="round" opacity=".7"/>`,
  // the big red reel on the tall rod's handle, with its crank
  `<path d="M70,79 L74.5,81" stroke="${METAL}" stroke-width="2.2" stroke-linecap="round"/>` +
    reel(78, 82.5, 6) +
    `<path d="M78,82.5 L84.5,77.5" stroke="${METAL}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<ellipse cx="85.2" cy="76.9" rx="1.6" ry="2.3" transform="rotate(40 85.2 76.9)" fill="${INK}"/>`,
];

export default draw;
