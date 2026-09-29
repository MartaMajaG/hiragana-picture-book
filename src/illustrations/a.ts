// あ (a) illustration: a festival candy apple (ringo ame).
// The loop is the apple, the long vertical stroke is the stick, the short stroke crosses it.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const APPLE =
  'M51,54 C45,48.5 33,48 28.5,58.5 C23,72 29,89 39.5,96.5 C45,100.5 50,99 54,97 C58,99.5 64,101 71,97.5 C82,91 90,74 85,60 C80.5,48 63,47 51,54Z';

// Right-hand side of the apple, in shade.
const SHADE =
  'M60,51.5 C70,52 77,58 79.5,67 C82,77 79,88 70,97.9 C82,91 90,74 85,60 C81.5,50.5 70,48.5 60,51.5Z';

const draw: Draw = () => [
  // soft ground shadow
  `<ellipse cx="56" cy="104.6" rx="28" ry="3.2" fill="#3A1A20" opacity=".12"/>`,
  // wooden stick coming out of the top
  `<path d="M50.4,8.5 C51.4,15 51.5,20 51.1,23.5 C50,31 49,41 48.4,53" fill="none" stroke="#D9B684" stroke-width="4.4" stroke-linecap="round"/>` +
    `<path d="M52.3,13 C52.6,19 52.4,23 52,27 C51.3,34 50.6,42 50.2,51" fill="none" stroke="#B48C58" stroke-width="1" stroke-linecap="round"/>`,
  // the candy that pooled and set at the base
  `<path d="M34.5,98.4 C41,103.2 71,103.6 79.5,98.6 C81.4,97.2 80.4,95.8 77.6,95.8 L37,95.8 C33.9,95.8 32.8,97.1 34.5,98.4Z" fill="#9E1427"/>`,
  // apple in its candy shell
  `<path d="${APPLE}" fill="#D6263A"/>` +
    `<path d="${SHADE}" fill="#AE1A2E"/>` +
    `<path d="M45.2,52.2 C47.6,54.6 54.2,55 57.4,52.8 C55,50.9 48.6,50.6 45.2,52.2Z" fill="#8E1225"/>` +
    `<ellipse cx="48.4" cy="52.8" rx="3.3" ry="1.5" fill="#B81C31"/>`,
  // highlights on the candy
  `<path d="M34.2,66.5 C34.4,60.6 37.6,57.2 41,56.4 C41.8,56.2 42.2,57 41.6,57.6 C38.8,60.2 37.4,63.4 37,67.2 C36.8,68.8 34.2,68.6 34.2,66.5Z" fill="#FFF4EE"/>` +
    `<circle cx="36" cy="72.2" r="1.3" fill="#FFF4EE"/>` +
    `<path d="M81.6,72 C81.8,78.6 79.4,85 75,90" fill="none" stroke="#F0707C" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
