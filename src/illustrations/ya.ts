// や (ya) illustration: a shaggy yak with its head down. Ya as in yak.
// The first stroke runs along the top of its lowered head, up the neck and back to the round rump.
// The long third stroke is its near horn curling up, then the front of its chest and its front leg;
// the little second stroke is the far horn hooking over. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FUR = '#8A5E45', SHADE = '#6B4533', MUZZLE = '#C9A88E', HORN = '#EFE4CC', HORN_SHADE = '#CDBE9E', HOOF = '#3E2E26',
  INK = '#2E2A22';

// a sturdy leg from its top down to a hoof on the ground
const leg = (x1: number, y1: number, x2: number, fill: string) =>
  `<path d="M${x1},${y1} L${x2},88.4" fill="none" stroke="${fill}" stroke-width="7.4" stroke-linecap="round"/>` +
  `<path d="M${x2 - 3.9},88 h7.8 v2.4 a1.4,1.4 0 0 1 -1.4,1.4 h-5 a1.4,1.4 0 0 1 -1.4,-1.4Z" fill="${HOOF}"/>`;

const draw: Draw = S => [
  shadow(60, 92.2, 38),
  // far legs, in shade
  leg(40, 68, 39, SHADE) + leg(74, 68, 74.6, SHADE),
  // far horn behind the head, sweeping up and hooking over along the second stroke
  `<path d="M41.6,45 C42,35 44.4,24 49.4,18.4 C53.4,14.4 58.6,17 59,22.6 C59.2,25 57.8,26.4 56.6,25.4 C56.4,22 54.2,20.4 52,22 C48.4,26 46.6,35 46.4,45.6Z" fill="${HORN_SHADE}"/>`,
  // near legs; the front one follows the bottom of the long stroke
  leg(43, 64, 49.4, FUR) + leg(84, 68, 84.6, FUR),
  // shaggy body: neck and back rising along the first stroke to the rump, long fringe hanging underneath
  `<path d="M38,46 C44,41.6 54,36.4 62,33.4 C70,30.6 78,29.8 85,31.2 C91,32.6 94.6,37.6 95,44 C95.4,52 95,60 93.6,66 C92.6,70 90,72 86,72.6 L82.4,76.4 L79,72.8 L75.4,76.8 L72,73 L68.4,77 L65,73.2 L61.4,77 L58,73.2 L54.4,77 L51,73.2 L47.4,76.6 L44.6,71.6 C42,64 40.4,56 38,46Z" fill="${FUR}"/>` +
    `<path d="M86,31.4 C91.6,33 94.6,38 95,44 C95.4,52 95,60 93.6,66 C92.6,70 90,72 86,72.6 L82.4,76.4 L79,72.8 L75.4,76.8 L72,73 L68.4,77 L67.4,62.6 C71,62.2 76,61.4 80.6,59.6 C88,57 93,52.4 93,46.2 C93,40 90.6,34.6 86,31.4Z" fill="${SHADE}"/>` +
    `<path d="M52,48 C53,54 52.6,60 51,65 M60,46 C61,53 60.6,60 59,66 M68,44 C68.6,50 68.4,55 67.4,60" fill="none" stroke="${SHADE}" stroke-width="1.2" stroke-linecap="round"/>`,
  // head held low, its top along the start of the first stroke, with a pale muzzle
  `<path d="M42,44 C38,44.6 34.6,46 29.2,48.6 C26,50 23,51.8 19.6,50.4 C16,49.4 13.6,52 13.8,56 C14,61 16.6,65 21,66.6 C26,68.4 32,67 36.4,64 C40.4,61.2 42.6,56 42.6,50Z" fill="${FUR}"/>` +
    `<path d="M42.6,50 C42.6,56 40.4,61.2 36.4,64 C32,67 26,68.4 21,66.6 C28,65.4 34,62.6 37.6,58.4 C40,55.6 41.6,53 42.6,50Z" fill="${SHADE}"/>` +
    `<path d="M16.2,53 C13.8,55 13.6,60 15.6,63.4 C17.6,66.2 21,67.2 24,66.8 C24.6,62 23.2,56.4 20.2,53.4 C19,52.4 17.4,52.2 16.2,53Z" fill="${MUZZLE}"/>`,
  // near horn curling up from the top of the head, along the top of the long stroke
  `<path d="M35.4,46.4 C35,40 34.4,34.4 32.8,29.8 C32.1,27.8 31.1,25.8 30,24.4 C33.6,26.6 35.8,30 37.2,34.6 C38.6,39 39.6,42.6 40.4,45.2Z" fill="${HORN}"/>` +
    `<path d="M38,45.8 C37.4,40 36.2,33.6 33.6,28.2 C35.8,30.4 37,32.6 37.9,35.4 C39,39 39.8,42.4 40.4,45.2Z" fill="${HORN_SHADE}"/>` +
    `<path d="M32.6,40.6 C36,40.2 38.4,41.4 40.8,43.4 L39,47.6 C37,46.4 34.4,45.8 31.6,46Z" fill="${FUR}"/>`,
  // face and highlights
  `<ellipse cx="26.6" cy="55.6" rx="1.7" ry="2.3" fill="${INK}"/><circle cx="26.1" cy="54.8" r=".6" fill="#fff"/>` +
    `<ellipse cx="16.2" cy="58.4" rx=".9" ry="1.3" fill="${INK}" opacity=".7"/>` +
    `<path d="M50,39.6 C57,35.6 65,32.8 73,31.6" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>` +
    `<path d="M31.4,30 C32.4,33 33,36 33.4,39" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round"/>`,
];

export default draw;
