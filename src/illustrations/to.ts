// と (to) illustration: a nail stuck in a toe. Ouch! To as in toe.
// The long stroke is the foot seen side on: up its instep from the big toe, round the toe and along the sole.
// The short first stroke is the nail, driven point-first into the top of the foot. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', TOENAIL = '#FBE6D6', METAL = '#A3ABBA', METAL_SHADE = '#6E7789',
  CUFF = '#5D8FC9', CUFF_SHADE = '#4674AA', OUCH = '#E0564A';

const draw: Draw = () => [
  shadow(66, 90.5, 36),
  // foot: big toe on the left, instep rising to the ankle, heel on the right
  `<path d="M31,72 C30,64 36,58 46,51.5 C57,44 68,37 76,30 C77.5,24 78,16 78,10 L98,10 C98,30 99,52 101.5,70 C102.5,80 98.5,88 91,88 L48,88 C38,88 31.5,82 31,72Z" fill="${SKIN}"/>` +
    `<path d="M91,10 L98,10 C98,30 99,52 101.5,70 C102.5,80 98.5,88 91,88 L52,88 C70,86 90,84 93,72 C92,52 91,30 91,10Z" fill="${SKIN_SHADE}"/>` +
    `<path d="M44.5,67 C46.5,73 46,80 43,85" fill="none" stroke="${SKIN_SHADE}" stroke-width="1.2" stroke-linecap="round"/>`,
  // big toenail
  `<ellipse cx="36" cy="64.2" rx="4.4" ry="2.7" transform="rotate(-38 36 64.2)" fill="${TOENAIL}" stroke="${SKIN_SHADE}" stroke-width=".7"/>`,
  // rolled-up trouser leg at the ankle
  `<rect x="74" y="0" width="27" height="14" rx="2.5" fill="${CUFF}"/><rect x="74" y="10" width="27" height="4" rx="1.5" fill="${CUFF_SHADE}"/>`,
  // the nail, point sunk into the top of the foot, along the first stroke
  `<path d="M36.4,20 L45.2,51.6" stroke="${METAL}" stroke-width="2.8" stroke-linecap="round"/><path d="M37.6,20.6 L45.8,50" stroke="${METAL_SHADE}" stroke-width="1" stroke-linecap="round"/>` +
    `<ellipse cx="35.8" cy="18.6" rx="5.4" ry="1.9" transform="rotate(-16 35.8 18.6)" fill="${METAL_SHADE}"/><ellipse cx="35.6" cy="17.9" rx="5" ry="1.4" transform="rotate(-16 35.6 17.9)" fill="${METAL}"/>`,
  // ouch marks around the nail, and highlights
  `<path d="M51,44 l4.5,-4.5 M53.5,50 l5.5,-1 M39.5,47 l-4.5,-3" stroke="${OUCH}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M52,56 C59,50.5 66,45 72,40" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/><path d="M34,70 C34.5,67.5 36,66 37.5,65.6" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round"/>`,
];

export default draw;
