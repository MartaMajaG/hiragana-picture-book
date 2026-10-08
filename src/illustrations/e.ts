// え (e) illustration: a baby elephant. E as in elephant.
// The short top stroke is its tuft of hair, the zigzag's diagonal is the trunk hanging down to the ground,
// and the bottom sweep is its front leg and feet. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const GREY = '#9AA3B5', SHADE = '#7C859A', EAR = '#B0B7C7', PINK = '#EDB8B4', INK = '#2E2A22', NAIL = '#F1EADB';

const leg = (x: number, fill: string) =>
  `<path d="M${x},64 L${x},89 C${x},91.6 ${x + 10},91.6 ${x + 10},89 L${x + 10},64Z" fill="${fill}"/>` +
  `<path d="M${x + 1.6},90.2 h2 M${x + 4},90.2 h2 M${x + 6.4},90.2 h2" stroke="${NAIL}" stroke-width="1.5" stroke-linecap="round"/>`;

const draw: Draw = () => [
  shadow(70, 93, 32),
  // tail and the far pair of legs, in shade
  `<path d="M98,58 C102,60 103,65 101,68" fill="none" stroke="${SHADE}" stroke-width="1.8" stroke-linecap="round"/>` +
    leg(64, SHADE) + leg(87, SHADE),
  // body, shaded along the back and rump
  `<ellipse cx="75" cy="62" rx="24" ry="17" fill="${GREY}"/>` +
    `<path d="M88,48 C97,53 100,62 98,70 C95,77 88,79 81,79 C92,72 95,60 88,48Z" fill="${SHADE}"/>`,
  // near pair of legs; the front one follows the bottom of the stroke
  leg(54, GREY) + leg(78, GREY),
  // trunk hanging down along the diagonal, curling up at the tip
  `<path d="M50,46 C46,58 39,70 32,79 C28.5,83 28.5,87.5 31.5,87.5 C33.5,87.5 34.5,85.5 34.5,83.5" fill="none" stroke="${GREY}" stroke-width="7.5" stroke-linecap="round"/>` +
    `<path d="M43.5,62 l3,1.4 M39.5,68 l3,1.6 M35.8,73.5 l3,1.8" stroke="${SHADE}" stroke-width="1" stroke-linecap="round"/>`,
  // head, ear over the shoulder, and the tuft of hair (the short top stroke)
  `<circle cx="56" cy="38" r="15" fill="${GREY}"/>` +
    `<path d="M65,29 C77,27 81,41 78,51 C75.5,57 68,57 65,52 C62,46 61,33 65,29Z" fill="${EAR}"/><path d="M66.5,34 C74,33 76,42 74.5,48 C72.8,52 68.6,52 67,49 C65.4,45 64.8,37 66.5,34Z" fill="${PINK}"/>` +
    `<path d="M51,24 C49,20 47,18 44,17 M54.5,23.2 C54.5,19.5 55,16.5 57,14 M58,23.6 C59.5,21 62,19.5 64.5,19.5" fill="none" stroke="${SHADE}" stroke-width="1.6" stroke-linecap="round"/>`,
  // face and highlight
  `<ellipse cx="49.5" cy="38" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="49" cy="37.2" r=".6" fill="#fff"/><circle cx="52.5" cy="44" r="2.4" fill="${PINK}" opacity=".8"/>` +
    `<path d="M46,49.5 C44,52 42,52.5 40,52" fill="none" stroke="${NAIL}" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M44,33 C45.5,28.5 49,25.5 53,24.8" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>`,
];

export default draw;
