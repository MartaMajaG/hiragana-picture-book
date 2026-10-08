// ほ (ho) illustration: a horse prancing, one front hoof lifted. Ho as in horse.
// The left stroke is its long flowing tail. On the right, the top bar is the top of its head and the second bar its jaw,
// the long stroke runs down its throat and chest, the loop is the lifted front leg folded at the knee, and the tail of the
// stroke is the other front leg stepping forward. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const COAT = '#C27B45', SHADE = '#9E5E30', MANE = '#4A3428', HOOF = '#3A2E28', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(56, 94, 40),
  // far legs in shade: the far hind leg and the front leg stepping forward (end of the long stroke)
  `<path d="M32,66 L39,66 L38.6,89 L32.4,89Z" fill="${SHADE}"/><path d="M31.6,88 h7.6 v4.4 h-7.6Z" fill="${HOOF}"/>` +
    `<path d="M74,70 L81,68 C83,76 86,83 90.4,87.6 L85.4,91 C80.6,85.6 76.6,78 74,70Z" fill="${SHADE}"/><path d="M84.6,90.6 L90.8,86.6 L93.4,90.4 L87.4,94Z" fill="${HOOF}"/>`,
  // body
  `<path d="M36,50 C48,47 66,48 76,51 C81,54 82,66 79,72 C76,76 66,77 52,76 C44,76 36,75 32,72 C28,68 28,54 36,50Z" fill="${COAT}"/>` +
    `<path d="M80,60 C81.6,65 81,70 78.6,72.6 C74,76 64,77 52,76 C66,74 76,71 80,60Z" fill="${SHADE}"/>`,
  // the tail grows out of the top of the rump, arcs up and back, then falls down the left stroke
  `<path d="M40,55 C36,50.6 32,44 29.4,35 C28,29 27.4,22 24.8,17.8 C22.6,15.8 20.4,17 19.4,20.4 C17.8,28 18,42 18.6,56 C19.2,68 20.4,78 24.4,84.6 C24.8,81 25.6,78 27,75.6 C28.4,79 30.8,81 33.4,81 C29,74 26.6,62 25.8,50 C25.6,45 25.6,40 26,36 C28.2,44 31.4,51 35.6,57.6 C37,59.6 39.6,59.4 40,57Z" fill="${MANE}"/>` +
    `<path d="M26,36 C25.6,40 25.6,45 25.8,50 C26.6,62 29,74 33.4,81 C30.8,81 28.4,79 27,75.6 C25,66 24,54 24.4,46 C24.6,42 25.2,38.6 26,36Z" fill="${HOOF}"/>` +
    `<path d="M21.8,28 C21,40 21,56 22.2,70" fill="none" stroke="${HOOF}" stroke-width="1" stroke-linecap="round"/>`,
  // near hind leg
  `<path d="M41,66 L49,66 L48.6,89 L41.4,89Z" fill="${COAT}"/><path d="M41,88 h8 v4.4 h-8Z" fill="${HOOF}"/>`,
  // neck and head: the head is held level, nose to the right
  `<path d="M56,21 C64,17.6 76,17.4 84,17.6 C89,17.8 92,21.4 92,27 C92,33 91,38 88,41 C85,43.6 80,44.6 77,45 L77.4,56 C77.8,62 79,66 80,70 L54,70 C51.6,62 50.6,50 51,38 C51.2,30 52.6,24 56,21Z" fill="${COAT}"/>` +
    `<path d="M92,27 C92,33 91,38 88,41 C85,43.6 80,44.6 77,45 L77.4,56 C77.8,62 79,66 80,70 L74,70 C73,60 72.6,50 73.4,44 C80,43 86,40 89,34 C90.6,31 91.6,29 92,27Z" fill="${SHADE}"/>` +
    `<ellipse cx="86" cy="30.6" rx="6.2" ry="9.6" fill="${SHADE}"/>`,
  // lifted front leg (the loop): forearm down from the chest, knee bent, hoof tucked back
  `<path d="M69,64 L79,64 C79.6,72 78.8,79 77,84 L68.4,83.6 C69.8,78 70,71 69,64Z" fill="${COAT}"/>` +
    `<path d="M79,64 C79.6,72 78.8,79 77,84 L74.4,84 C76,78 76.6,71 76,64Z" fill="${SHADE}"/>` +
    `<circle cx="72.8" cy="84" r="4.6" fill="${COAT}"/>` +
    `<path d="M72.4,79.6 L55.4,78.2 L54.6,84.8 L71.4,88.6Z" fill="${COAT}"/><path d="M71.4,88.6 L54.6,84.8 L54.8,83 L72.6,86.6 C73.8,87 73.2,88.6 71.4,88.6Z" fill="${SHADE}"/>` +
    `<path d="M55.8,77.8 L50.6,77.8 C48.6,79.6 48.4,83.4 49.8,85.4 L55,85.6Z" fill="${HOOF}"/>`,
  // mane down the back of the neck, the forelock and the ears
  `<path d="M60,17.6 C53,18 48,24 46.4,32 C45,40 45,48 47,56 C44,58 43,60 44,62 L55,58 C53,50 52.4,40 53.6,32 C54.4,26 57,21 60,17.6Z" fill="${MANE}"/>` +
    `<path d="M47,30 L42.6,33 L46.2,36 M46,42 L41.6,45 L45.6,48 M46.4,52 L42,55.4 L46.4,58" fill="${MANE}"/>` +
    `<path d="M64.6,18.4 L66.4,5.4 L71,18Z" fill="${SHADE}"/><path d="M60,19 L58.4,6 L66,17.4Z" fill="${COAT}"/><path d="M60.4,16 L59.6,9.6 L63.4,16.4Z" fill="${SHADE}"/>` +
    `<path d="M63,17 C66,18 69,21 69.4,25 C66.4,24.4 64,22 63,17Z" fill="${MANE}"/>`,
  // face: eye, nostril, mouth and a pink cheek
  `<ellipse cx="72" cy="27.4" rx="1.9" ry="2.5" fill="${INK}"/><circle cx="71.5" cy="26.6" r=".6" fill="#fff"/>` +
    `<ellipse cx="87.4" cy="28" rx="1.2" ry="1.8" fill="${INK}" opacity=".7"/>` +
    `<path d="M84,39 C86,39.6 88,39 89.4,37.6" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round" opacity=".7"/>` +
    `<ellipse cx="74" cy="34.6" rx="3" ry="2" fill="#F2A7A0" opacity=".8"/>`,
  // highlights on the forehead, neck and back
  `<path d="M66,21.4 C71,20.4 76,20.2 80,20.4" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="M40,52.4 C46,51 52,50.8 56,51" fill="none" stroke="#FFF4EE" stroke-width="1.2" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M24.6,24 C24,30 23.8,36 24,42" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".5"/>`,
];

export default draw;
