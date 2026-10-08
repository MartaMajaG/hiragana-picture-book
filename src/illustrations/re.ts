// れ (re) illustration: a red panda sitting by a bamboo stalk. Re as in red panda.
// The long first stroke is the bamboo stalk. In the second stroke, the zigzag on the left is its ringed tail curling up,
// the long rising line is its back up to its round head, and the drop and flick at the end are its front leg and small raised paw.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FUR = '#C8562B', SHADE = '#9C3F1E', DARK = '#4A2A22', WHITE = '#F6EDE3', BAMBOO = '#7FAE52', BAMBOO_SHADE = '#5E8C3A', INK = '#2E2A22';

const draw: Draw = S => [
  shadow(56, 93, 36),
  // bamboo stalk behind, along the first stroke, with a couple of leaves at the top
  `<path d="${S[0]}" fill="none" stroke="${BAMBOO}" stroke-width="4.6" stroke-linecap="round"/>` +
    `<path d="M32.4,30 h4.4 M31.9,50 h4.4 M31.8,70 h4.4" stroke="${BAMBOO_SHADE}" stroke-width="1.4" stroke-linecap="round"/>` +
    `<path d="M36.5,23 C40,17.5 46,15.5 51,16 C47,20 42,22.5 36.5,23Z" fill="${BAMBOO}"/><path d="M36.5,23 C42,21.5 46.5,19 51,16 C47,21 42,23.5 36.5,23Z" fill="${BAMBOO_SHADE}"/>`,
  // ringed tail curling up behind, along the zigzag
  `<path d="M23.5,68 C28,58 34.5,47 37.8,39.5 C38.8,35.5 35.5,34.5 31,36.2 C26.5,38 21.5,40 17.5,40.8" fill="none" stroke="${FUR}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M23.5,68 C28,58 34.5,47 37.8,39.5 C38.8,35.5 35.5,34.5 31,36.2 C26.5,38 21.5,40 17.5,40.8" fill="none" stroke="${SHADE}" stroke-width="9" stroke-dasharray="3.5 5" stroke-dashoffset="-6"/>`,
  // body: back rising along the long line, round haunch low on the left, chest dropping to the front leg
  `<path d="M24,69.5 C35,59 46,48.5 57,39 C62,34.5 72,34.5 75,42 C77,52 78,62 77.5,72 L77,88 L32,91.5 C21,91.5 18.5,79 24,69.5Z" fill="${FUR}"/>` +
    `<path d="M71,50 C75,56 77.8,64 77.5,72 L77,88 L62,89.5 C70,81 73,66 71,50Z" fill="${SHADE}"/>` +
    `<path d="M24.5,78 C27,70 36,66 44,69 C51,72 53,82 50,90.5 L32,91.5 C25,91.5 23,85 24.5,78Z" fill="${SHADE}"/>` +
    `<path d="M26.5,78.5 C29,72 36,69 42,71 C38,72 32,74.5 26.5,78.5Z" fill="${FUR}"/>`,
  // dark legs: hind foot tucked under, front leg straight down with a small paw lifted forward
  `<ellipse cx="40" cy="91.3" rx="9" ry="2.8" fill="${DARK}"/>` +
    `<path d="M68.5,64 C68.5,59 76,59 76,64 L76,85 C76,89.5 68.5,89.5 68.5,85Z" fill="${DARK}"/>` +
    `<ellipse cx="79" cy="85.2" rx="4.6" ry="2.6" transform="rotate(-28 79 85.2)" fill="${DARK}"/>`,
  // round head over the top of the curve, big ears, white face markings
  `<path d="M58.5,33.5 L57,23.5 L66,28.5Z M71,28 L78.5,22 L77.5,32Z" fill="${FUR}"/><path d="M59.4,30.5 L59,26.8 L62.4,29Z M73.2,27.6 L76.6,25 L76.2,29.4Z" fill="${WHITE}"/>` +
    `<circle cx="68" cy="40" r="10.5" fill="${FUR}"/>` +
    `<path d="M66,46 C66,42.5 70,41.5 74,42.5 C78,42 81.5,43.5 81.2,46.5 C81,50 76,51.6 71.5,51 C68,50.5 66,48.5 66,46Z" fill="${WHITE}"/>` +
    `<ellipse cx="66.5" cy="36" rx="2" ry="1.3" fill="${WHITE}"/><ellipse cx="73.5" cy="36" rx="1.8" ry="1.2" fill="${WHITE}"/>`,
  // face: eyes, nose, highlights
  `<ellipse cx="67.5" cy="40.5" rx="1.6" ry="2.1" fill="${INK}"/><circle cx="67.1" cy="39.8" r=".55" fill="#fff"/>` +
    `<ellipse cx="74" cy="40.5" rx="1.5" ry="2" fill="${INK}"/><circle cx="73.6" cy="39.8" r=".5" fill="#fff"/>` +
    `<ellipse cx="80" cy="45.5" rx="1.6" ry="1.2" fill="${INK}"/>` +
    `<path d="M60.5,35 C62,32 64.5,30.6 67.5,30.3" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M33,64 C40,57 46,51.5 52,46.5" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>`,
];

export default draw;
