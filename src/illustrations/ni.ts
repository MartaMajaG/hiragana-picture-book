// に (ni) illustration: a little chibi ninja holding up a katana. Ni as in ninja.
// The left stroke is the katana, blade up, and its little flick at the bottom is the ninja's fist gripping the handle.
// The top right stroke is the pale eye-slit across the ninja's hooded face, and the bottom stroke is the red belt
// wrapped round the ninja's round tummy. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const SUIT = '#3A4257', SUIT_SHADE = '#2A3042', SKIN = '#F2C9A5', SKIN_SHADE = '#DDA880', RED = '#D9534A', RED_SHADE = '#B03E37',
  STEEL = '#D5DBE3', STEEL_SHADE = '#A7B0BD', GOLD = '#D9A441', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(70, 96.5, 26),
  // hood tails fluttering out behind the head, tied at the back
  `<path d="M85,21 C91,17 97,14.5 103,13.5 C101,16.5 100,18 101.5,20.5 C96,20 91,21.5 87,24.5Z" fill="${RED}"/>` +
    `<path d="M86,24 C92,24.5 97,26.5 101.5,30 C98.5,30.2 97,31.5 96.5,34 C93,30.5 89.5,28.5 85.5,27.5Z" fill="${RED_SHADE}"/>`,
  // legs, the far one in shade, with dark split-toe boots
  `<path d="M75,84 L84,84 L83.5,94 L75.5,94Z" fill="${SUIT_SHADE}"/><ellipse cx="80.5" cy="95" rx="5" ry="2.4" fill="${INK}"/>` +
    `<path d="M58,84 L67,84 L66.5,94 L58.5,94Z" fill="${SUIT}"/><ellipse cx="61.5" cy="95" rx="5" ry="2.4" fill="${INK}"/>`,
  // round little body
  `<path d="M58,46 C52,52 49.5,61 50.5,70 C51.5,80 57,87 66,88 L84,88 C90.5,87 93.5,81 92.5,72 C91.5,61 88.5,51 82,46Z" fill="${SUIT}"/>` +
    `<path d="M84,49 C89,55 91.5,63 92.5,72 C93.5,81 90.5,87 84,88 L79,88 C86,84 89,76 88.5,67 C88,60 86.5,54 84,49Z" fill="${SUIT_SHADE}"/>`,
  // red belt round the tummy (the bottom stroke), knotted at the front
  `<path d="M52.5,68 C54.3,80.9 64.4,84 76.8,82.9 C81.8,82.5 85.6,82.1 91,80.9" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M76.8,85.3 C81.8,84.9 86,84.4 90.4,83.4" fill="none" stroke="${RED_SHADE}" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M56.5,80 L52.8,86.8 L56.4,86.8 L58.4,81Z M59,80.6 L61.2,87.6 L58,87 L57.4,81.2Z" fill="${RED_SHADE}"/><ellipse cx="57.6" cy="79.2" rx="2.9" ry="2.4" fill="${RED}" stroke="${RED_SHADE}" stroke-width=".9"/>`,
  // soft shade under the chin
  `<ellipse cx="71" cy="49.5" rx="13" ry="4.2" fill="${SUIT_SHADE}"/>`,
  // other arm resting by the side
  `<path d="M84,53 C88,57 90,61 90.5,65" fill="none" stroke="${SUIT}" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M88,55 C90,58 91.5,61.5 92,65" fill="none" stroke="${SUIT_SHADE}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<circle cx="90.8" cy="67.2" r="3.7" fill="${SKIN}"/><path d="M93.4,65 C94.6,67.2 94,69.8 91.6,70.8" fill="none" stroke="${SKIN_SHADE}" stroke-width="1.2" stroke-linecap="round"/>`,
  // hooded head, with the pale eye slit (the top right stroke)
  `<clipPath id="ni-head"><circle cx="70" cy="32" r="17"/></clipPath>` +
    `<circle cx="70" cy="32" r="17" fill="${SUIT}"/>` +
    `<path d="M79,17.5 C85,21 88,27 87,34 C86,41.5 80,47.5 72,49 C80,44 84.5,37.5 84.5,30 C84.5,25 82.5,20.5 79,17.5Z" fill="${SUIT_SHADE}"/>` +
    `<g clip-path="url(#ni-head)"><path d="M50,25.8 L90,22.6 L90,33.8 L50,37.8Z" fill="${SKIN}"/>` +
    `<path d="M84.5,23 L90,22.6 L90,33.8 L84,34.4 C85,30.8 85.2,26.8 84.5,23Z" fill="${SKIN_SHADE}"/></g>` +
    `<path d="M57,20.5 C65,18.6 75,18.2 85,20.6" fill="none" stroke="${RED}" stroke-width="2" stroke-linecap="round"/><circle cx="86" cy="22.5" r="2.4" fill="${RED}"/>`,
  // friendly eyes and rosy cheeks
  `<ellipse cx="63.2" cy="31" rx="1.9" ry="2.5" fill="${INK}"/><circle cx="62.7" cy="30.2" r=".6" fill="#fff"/>` +
    `<ellipse cx="75.6" cy="30" rx="1.9" ry="2.5" fill="${INK}"/><circle cx="75.1" cy="29.2" r=".6" fill="#fff"/>` +
    `<ellipse cx="58.6" cy="34.4" rx="2" ry="1.3" fill="#EDB8B4"/><ellipse cx="80.4" cy="33.2" rx="2" ry="1.3" fill="#EDB8B4"/>`,
  // the katana (left stroke): silver blade up, gold guard, dark wrapped handle
  `<path d="M24.6,20.5 C26.6,23 27.4,26 27.1,29.3 C25.8,40 23,51 21,62 L16.4,62 C18,51 21,40 23.4,29.6 C24.2,26.4 24.6,23.5 24.6,20.5Z" fill="${STEEL}"/>` +
    `<path d="M26.9,26.5 C27.4,27.5 27.3,28.5 27.1,29.3 C25.8,40 23,51 21,62 L19.4,62 C21.4,51 24.2,39.5 25.8,29.5 C26.2,28.4 26.6,27.4 26.9,26.5Z" fill="${STEEL_SHADE}"/>` +
    `<path d="M24.4,24 C23.6,34 21.4,44 19.4,54" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round"/>` +
    `<path d="M16.2,64 L20.8,64 L20.4,86.5 L15.8,86.5Z" fill="${SUIT_SHADE}"/>` +
    `<path d="M16.2,67 L20.7,70.5 M20.7,67 L16.2,70.5 M16.1,73 L20.6,76.5 M20.6,73 L16.1,76.5" stroke="${STEEL_SHADE}" stroke-width=".8" stroke-linecap="round"/>` +
    `<ellipse cx="18.6" cy="63" rx="5.8" ry="1.9" fill="${GOLD}"/><ellipse cx="18.6" cy="87" rx="2.6" ry="1.4" fill="${GOLD}"/>`,
  // arm reaching over, fist gripping the handle (the flick)
  `<path d="M56,55 C48,63 38,73 28.5,78" fill="none" stroke="${SUIT}" stroke-width="7" stroke-linecap="round"/>` +
    `<ellipse cx="22.4" cy="80" rx="5.6" ry="5.4" fill="${SKIN}"/>` +
    `<path d="M26.4,76 C28.4,79 27.8,83.4 24.4,85" fill="none" stroke="${SKIN_SHADE}" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M17.4,78.5 C19.6,79.4 21.8,79.4 24,78.6 M17.4,81.6 C19.6,82.5 21.8,82.5 24,81.7" fill="none" stroke="${SKIN_SHADE}" stroke-width=".9" stroke-linecap="round"/>`,
  // highlights on the hood and the body
  `<path d="M57.5,23 C59.5,19.5 62.5,17 66,15.8" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M55,58 C56,54 57.5,51 60,48.8" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>`,
];

export default draw;
