// む (mu) illustration: a cow lying down and mooing. Mu as in "moo".
// The top crossbar is its pair of horns, the long stroke runs from the tuft on its head down its face,
// loops round its muzzle, then traces its chest and belly along the ground to its rump. The little hook is its swishing tail.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const HIDE = '#F7F3EC', SHADE = '#DCD4C6', SPOT = '#4A423C', MUZZLE = '#F2B7B0', MUZZLE_SHADE = '#DE9890', HORN = '#E6C98C', HORN_SHADE = '#C9A766', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(56, 93.5, 38),
  // tail hanging from the rump, with a dark tuft at the tip
  `<path d="M79,37.5 C85,40 90,43 92.6,46.2 C94,48.4 93,50 90.6,50.4" fill="none" stroke="${SHADE}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M92.4,47.6 C93.6,50.8 91,53 88,51.6 C86.6,50.8 87.4,49 89.2,49.4Z" fill="${SPOT}"/>`,
  // body lying down, belly on the ground
  `<path d="M34,50 C44,40 66,35.5 80,38.5 C88,41 90,54 89,68 C88.4,80 86,92 76,92 L34,92 C26,92 25,84 28,76 C30,68 30,58 34,50Z" fill="${HIDE}"/>` +
    `<path d="M80,38.5 C88,41 90,54 89,68 C88.4,80 86,92 76,92 L62,92 C74,90 81,82 82,68 C83,56 83,46 80,38.5Z" fill="${SHADE}"/>` +
    `<path d="M55,40.6 C62,38.6 69,38.8 72,42 C74,46 70,52 63,53 C57,54 51,50 51,46 C51,43.6 52.6,41.6 55,40.6Z" fill="${SPOT}"/>` +
    `<path d="M66,68 C72,65 79,67 79.6,73 C80,79 74,83 68,82 C63,81 61,76 62,72 C62.6,70 64,68.8 66,68Z" fill="${SPOT}"/>` +
    `<path d="M84.6,52 C87,53 88.6,56 88.8,60 C88.8,63 87.4,64.6 85.6,64 C84,63.2 83.6,60 83.8,57Z" fill="${SPOT}" opacity=".85"/>`,
  // front leg tucked under the chest
  `<path d="M34,84 C40,84 48,85 50,88.6 C51,91 49,92.4 46,92.4 L33,92.4 C29,92.4 29.6,84 34,84Z" fill="${SHADE}"/>` +
    `<path d="M44.6,86.6 C48.4,86.8 50.6,88.4 50.4,90.6 C50.2,92 48.6,92.4 46.6,92.4 L44.4,92.4Z" fill="${SPOT}"/>`,
  // ears, then the horns along the crossbar
  `<path d="M24,37 C19,35 14,36.6 12.6,39.6 C16.4,41.6 21,41.4 24.6,40Z" fill="${HIDE}"/><path d="M23,38 C19.6,37 16.6,37.6 15.2,39.2 C18,40.2 21,40.2 23.4,39.4Z" fill="${MUZZLE}"/>` +
    `<path d="M46,35 C51,32.2 56,32.6 58.2,35.4 C54.6,38 50,38.4 46.2,38Z" fill="${SHADE}"/><path d="M47.2,35.6 C50.6,34 54,34 56,35.4 C53.4,36.8 50.4,37 47.4,36.8Z" fill="${MUZZLE_SHADE}"/>` +
    `<path d="M31,33.6 C27,34.2 22.6,34 19.8,32.2 C18.8,31.4 19.2,30.2 20.4,30.4 C23.4,30.8 27,29.6 30,27.6Z" fill="${HORN}"/>` +
    `<path d="M31,33.6 C27,34.2 22.6,34 19.8,32.2 C22.6,32.6 26.6,32.2 30.4,31Z" fill="${HORN_SHADE}"/>` +
    `<path d="M41,27.4 C46.4,27.2 51.6,26.4 55.8,25 C57.2,24.6 57.8,25.8 56.8,26.8 C53.4,30 47.6,32.2 42.4,32.4Z" fill="${HORN}"/>` +
    `<path d="M56.8,26.8 C53.4,30 47.6,32.2 42.4,32.4 L42.2,30.6 C47.4,30.4 52.6,28.8 56.8,26.8Z" fill="${HORN_SHADE}"/>`,
  // head with a tuft on top, the muzzle is the loop
  `<ellipse cx="36" cy="40" rx="12.4" ry="14" fill="${HIDE}"/>` +
    `<path d="M44,30 C48.6,34 49.6,42 47,48 C45,52.4 41,54.6 37,55 C43,50 45.6,40 44,30Z" fill="${SHADE}"/>` +
    `<path d="M33,27 C31.8,22 33.6,17.6 37,15.6 C36.2,19 37.6,21 39.6,21.4 C40.6,24 39.6,26.4 37.6,27.4Z" fill="${SPOT}"/>` +
    `<path d="M26,32 C29,28 34,26.4 38,27.4 C35,31 34.6,36.6 30,38.6 C27.6,39.6 25.6,36 26,32Z" fill="${SPOT}"/>` +
    `<ellipse cx="28.6" cy="60.2" rx="12.6" ry="10.4" fill="${MUZZLE}"/>` +
    `<path d="M38.4,53.8 C41.6,57.6 41.8,63.4 38.6,67 C35.6,70.2 30.6,71 26.6,70.4 C33,68 38.8,62 38.4,53.8Z" fill="${MUZZLE_SHADE}"/>`,
  // face: eyes, nostrils and a round "moo" mouth
  `<ellipse cx="31" cy="43" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="30.5" cy="42.2" r=".6" fill="#fff"/>` +
    `<ellipse cx="42" cy="42.4" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="41.5" cy="41.6" r=".6" fill="#fff"/>` +
    `<ellipse cx="23.6" cy="57" rx="1.5" ry="2.1" fill="${MUZZLE_SHADE}"/><ellipse cx="32.6" cy="56.6" rx="1.5" ry="2.1" fill="${MUZZLE_SHADE}"/>` +
    `<ellipse cx="28.4" cy="64.4" rx="3" ry="3.4" fill="#8E3F48"/>`,
  // highlights on the head and back
  `<path d="M25.6,43 C25.4,46 26,48.4 27.4,50.4" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M20,55.6 C21,53.2 23,51.8 25.4,51.4" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M45.8,49.4 C46.8,46.8 48.6,44.8 50.8,43.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/>`,
];

export default draw;
