// ゆ (yu) illustration: a unicorn, head and neck. Yu as in "you-nicorn".
// In the first stroke, the drop on the left is the flowing mane and the big loop is the unicorn's head, nose to the right.
// The second stroke is the golden horn on its forehead, running down the cheek and the front of the neck.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const COAT = '#F7F3FA', SHADE = '#DCD2EA', MANE = '#B99BE0', MANE_SHADE = '#9A7AC8', HORN = '#F2C45A', HORN_SHADE = '#D6A23A',
  PINK = '#F2A7A0', INK = '#2E2A22';

const draw: Draw = () => [
  // neck, down to the chest
  `<path d="M24,70 C30,56 40,44 50,36 L62,40 C63.4,56 63,68 60,78 C57,86 53.6,92 52.6,100.6 C41,102 29,102 18.4,100.6 C19,92 20.6,80 24,70Z" fill="${COAT}"/>` +
    `<path d="M63,62 C63,68 62.4,73 60,78 C57,86 53.6,92 52.6,100.6 L46.4,101.2 C48,92 52,84 55.4,77 C58,72 60.6,67 63,62Z" fill="${SHADE}"/>`,
  // ear, behind the horn
  `<path d="M52.6,34 C50.4,28 50.4,22.4 52.8,18.6 C57,22 59.4,27.4 60,33Z" fill="${COAT}"/><path d="M53.6,31 C52.6,27 52.8,24 54,21.8 C56.2,24.4 57.4,27.6 57.6,31Z" fill="${PINK}"/>`,
  // head, the big loop, with the muzzle to the right
  `<path d="M44,38 C52,32 62,29.6 72,30 C82,30.4 89,37 90.6,46 C92,56 88.6,67 78,73.6 C70,77.8 58,77 50,71 C44,66 42,60 42,52 C42,46 42.4,41.4 44,38Z" fill="${COAT}"/>` +
    `<path d="M91,48 C91.6,58 88,67 78,73.6 C70,77.8 58,77 50,71 C60,73.6 72,72.4 80,66.4 C86,62 89.6,56 91,48Z" fill="${SHADE}"/>`,
  // flowing mane down the back of the neck (the drop on the left of the first stroke), with a forelock
  `<path d="M56,29 C48,22.6 36,20 24,22.4 C20,23.4 18,26 19.8,28.6 C16.6,31.6 16.4,36 19,38.6 C16,42 16,47.6 18.6,50 C15.8,54 16,59.6 18.8,62 C16.2,66.2 17,71.6 20.6,73.4 C19.8,77.6 21.4,81.6 25,82.6 C24.4,78 25.6,74.4 27.6,72 C31,62 36,52.6 42,46.8 C47.6,41.4 54,38.6 60,38 C61.2,34.4 59.6,31.6 56,29Z" fill="${MANE}"/>` +
    `<path d="M19.8,28.6 C16.6,31.6 16.4,36 19,38.6 C16,42 16,47.6 18.6,50 C15.8,54 16,59.6 18.8,62 C16.2,66.2 17,71.6 20.6,73.4 C19.8,77.6 21.4,81.6 25,82.6 C23.4,76 22.2,68 22.4,58 C22.6,46 22.4,36 19.8,28.6Z" fill="${MANE_SHADE}"/>` +
    `<path d="M52,28.4 C43,25 33,25.4 26.4,29 M53,34.4 C43,32.4 33.6,36 28.4,42.6 M42,42.6 C35,47 30,54 27.6,62" fill="none" stroke="${MANE_SHADE}" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M24,26.6 C28,24.6 32.6,24 37,24.4" fill="none" stroke="#FFF4EE" stroke-width="1.1" stroke-linecap="round" opacity=".8"/>`,
  // golden horn on the forehead (the top of the second stroke)
  `<path d="M58.2,32.8 L58.8,13.2 L65.8,31.6Z" fill="${HORN}"/>` +
    `<path d="M62,32.2 L58.8,13.2 L65.8,31.6Z" fill="${HORN_SHADE}"/>` +
    `<path d="M58.4,27.4 L64,25.4 M58.6,21.8 L62,20.4 M58.8,17 L60.4,16.4" fill="none" stroke="#FFF4EE" stroke-width="1" stroke-linecap="round"/>`,
  // face: eye with lashes, pink cheek, nostril and smile
  `<ellipse cx="72.4" cy="45.6" rx="2.1" ry="2.9" fill="${INK}"/><circle cx="71.8" cy="44.6" r=".7" fill="#fff"/>` +
    `<path d="M73.6,42.4 L75.4,40.4 M74.6,43.6 L76.8,42.4" stroke="${INK}" stroke-width=".8" stroke-linecap="round"/>` +
    `<circle cx="75.6" cy="56" r="3" fill="${PINK}" opacity=".7"/>` +
    `<ellipse cx="86.2" cy="56.4" rx="1.1" ry="1.6" transform="rotate(-20 86.2 56.4)" fill="${INK}" opacity=".7"/>` +
    `<path d="M79.4,65.6 C81.4,66.8 83.6,66.6 85.2,65" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round"/>`,
  // highlight
  `<path d="M66.4,34.6 C70,33.2 74,33 77.6,33.8" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
