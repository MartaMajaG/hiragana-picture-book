// み (mi) illustration: "Me, 21!" Someone turning 21 holds a big foil number balloon and points at themself. Mi as in "me".
// み looks like a handwritten 21. Stroke 1's top bar, diagonal and loop are the balloon's "2"; its long tail to the right
// and the short second stroke crossing it are the "1". The balloon follows both strokes exactly, its string runs down
// from the foot of the "1" to the birthday person standing small at the lower right. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FOIL = '#F2B43E', FOIL_SHADE = '#D18A26', STRING = '#B8A88E',
  SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', HAIR = '#3B2F2A', SHIRT = '#E07B5A', SHIRT_SHADE = '#C25F42',
  PANTS = '#5D8FC9', SHOE = '#3B2F2A', INK = '#2E2A22';

const W = 12;

const draw: Draw = S => [
  shadow(100, 105.5, 11),
  // string from the knot at the foot of the "1" down to the birthday person's hand
  `<path d="M54.5,99.5 C60,106 74,104 81,97 C84,94 86,91 88,88.5" fill="none" stroke="${STRING}" stroke-width=".9" stroke-linecap="round"/>`,
  // the foil "21" balloon along both strokes: shade side first, then the foil, then the knot
  `<g transform="translate(1.4 1.7)" fill="none" stroke="${FOIL_SHADE}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"><path d="${S[0]}"/><path d="${S[1]}"/></g>` +
    `<g fill="none" stroke="${FOIL}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"><path d="${S[0]}"/><path d="${S[1]}"/></g>` +
    `<path d="M53.4,97.2 L56.6,99 L55,101.2 L52.2,99.6Z" fill="${FOIL_SHADE}"/>`,
  // foil shine: thin highlights on the upper-left edges
  `<path d="M33,22.4 C35,23.4 38,23.2 41,22.6 C44,22 47,21.2 50,20.4" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M50.5,30 C48,37 44.5,46 41,54" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M15.5,68.8 C19,63 26,61 32,60.8" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M52,60.6 C57,61.2 62,62.2 66,63.2" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>` +
    `<path d="M74.6,55.2 C75.4,58 75,60.6 74,63" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>`,
  // legs and shoes
  `<path d="M97,88 L96.4,102 M104,88 L104.6,102" fill="none" stroke="${PANTS}" stroke-width="4.6" stroke-linecap="round"/>` +
    `<ellipse cx="95" cy="103.6" rx="3.4" ry="1.9" fill="${SHOE}"/><ellipse cx="106" cy="103.6" rx="3.4" ry="1.9" fill="${SHOE}"/>`,
  // body, and the arm hanging down to hold the string
  `<path d="M93.6,72 C94,67.6 97,65.6 100.5,65.6 C104,65.6 107,67.6 107.4,72 L108,90 L93,90Z" fill="${SHIRT}"/>` +
    `<path d="M104,66.4 C106,67.6 107.2,69.6 107.4,72 L108,90 L104.6,90 C105.6,83 105.6,74 104,66.4Z" fill="${SHIRT_SHADE}"/>` +
    `<path d="M94.6,70 C92.6,75 91,80 89.8,85" fill="none" stroke="${SHIRT}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="88.8" cy="88.4" r="2.4" fill="${SKIN}"/>`,
  // round head and hair, smiling up at the balloon
  `<path d="M98.6,62 L102.4,62 L102.4,66.6 C101,67.4 100,67.4 98.6,66.6Z" fill="${SKIN_SHADE}"/>` +
    `<circle cx="100.5" cy="55" r="9" fill="${SKIN}"/><path d="M106,48 C109,51.5 109.8,56 108.4,59.6 C106.8,63.2 103.6,64.4 100.5,64 C105,61 107.6,55 106,48Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M91.4,54.4 C91,47.6 95,44.4 100.5,44.4 C106.4,44.4 110,47.6 109.6,54.4 C107.6,50.6 104.4,49 100.5,49.2 C96.6,49.2 93.4,50.8 91.4,54.4Z" fill="${HAIR}"/>` +
    `<path d="M95.2,55.6 Q96.8,53.8 98.4,55.6 M102.6,55.6 Q104.2,53.8 105.8,55.6" fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>` +
    `<path d="M97.2,59 C98.4,62.4 102.6,62.4 103.8,59Z" fill="#8A3A3A"/><circle cx="106" cy="59" r="1.5" fill="#F2A7A0" opacity=".8"/>` +
    `<path d="M93.8,49.6 C95,47.6 97,46.4 99,46" fill="none" stroke="#FFF4EE" stroke-width=".9" stroke-linecap="round" opacity=".7"/>`,
  // other arm bent with the elbow out, a finger pointing back at their own chest: "Me!"
  `<path d="M106.4,69.6 C109.6,72.6 110,77 107.6,78.6 C106.6,79.2 105.6,79 104.8,78.4" fill="none" stroke="${SHIRT}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="104.4" cy="77.6" r="2.3" fill="${SKIN}"/><path d="M103,76.6 L99.4,75.4" stroke="${SKIN}" stroke-width="1.7" stroke-linecap="round"/>`,
];

export default draw;
