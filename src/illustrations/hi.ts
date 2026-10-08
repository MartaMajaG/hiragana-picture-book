// ひ (hi) illustration: a face giggling "hee-hee" with a huge grin. Hi as in "hee-hee".
// The big U of the stroke is the wide-open grinning mouth, the little flick at the start is a dimple at one corner,
// and the peak and tail at the end are the other dimple and a happy tear rolling down the cheek.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const SKIN = '#F6C85F', SKIN_SHADE = '#E0A93E', MOUTH = '#8E2E3A', TONGUE = '#E86F7A', TEAR = '#8FC7E8', INK = '#2E2A22';

// the mouth follows the stroke's big U, closed across the top in a slight smile
const MOUTH_D = 'M42.1,26 C15,58.6 18.4,84.5 40.6,88.9 C58.7,92.4 78.2,72.5 76.2,32.4 C66,31 52,27.6 42.1,26Z';

const draw: Draw = () => [
  // round face, shaded on the lower right
  `<circle cx="55" cy="56" r="51" fill="${SKIN}"/>` +
    `<path d="M88,17 C104,31 110,55 100,77 C90,99 64,110 40,103 C68,101 94,82 98,55 C100,40 96,27 88,17Z" fill="${SKIN_SHADE}"/>`,
  // eyes squeezed shut with laughter
  `<path d="M30,17 Q35.5,10 41,17 M64,19 Q69.5,12 75,19" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`,
  // the big open grin along the stroke, top teeth and tongue
  `<path d="${MOUTH_D}" fill="${MOUTH}"/>` +
    `<path d="M42.1,26 C52,27.6 66,31 76.2,32.4 L76.3,37 C64,38.2 50,36.6 36.6,33.6Z" fill="#fff"/>` +
    `<path d="M27.6,82.6 C33,73 53,72 63.4,82.4 C57.5,88 48.5,90.4 40.6,88.9 C34.5,87.7 30,85.6 27.6,82.6Z" fill="${TONGUE}"/>`,
  // dimple at the left corner (the opening flick), dimple and happy tear on the right (the peak and tail)
  `<path d="M20,25.1 C21.3,26 23.8,27.4 26.5,26.5 C29.3,25.6 33.8,24.1 37.9,22" fill="none" stroke="${SKIN_SHADE}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M76.2,32.4 C75.5,18 76,17.6 80.4,30.6" fill="none" stroke="${SKIN_SHADE}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M82,36 C85,44 89.5,51 94.5,56 C97.5,59 96.5,63 93.5,63.4 C90.5,63.6 89,60.6 90.6,57.6 C87,52 84,45 82,36Z" fill="${TEAR}"/>`,
  // cheeks and highlight
  `<ellipse cx="15.5" cy="52" rx="5.5" ry="3.8" fill="#F2A7A0" opacity=".8"/><ellipse cx="90" cy="30" rx="5" ry="3.4" fill="#F2A7A0" opacity=".8"/>` +
    `<path d="M8.6,42 C10,35 12.6,29.6 16,25.6" fill="none" stroke="#FFF4EE" stroke-width="1.6" stroke-linecap="round"/>`,
];

export default draw;
