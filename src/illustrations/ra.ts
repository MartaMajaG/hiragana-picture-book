// ら (ra) illustration: a rabbit sitting up. Ra as in rabbit.
// The top stroke is the tip of its tall ear flopping over, the upright part of the second stroke is the ear itself,
// and the big curve is its round back and rump sweeping down to its feet.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { shadow } from './helpers';

const FUR = '#CFA27A', SHADE = '#A97D58', CREAM = '#F6E9DA', PINK = '#F2A7A0', INK = '#2E2A22';

const draw: Draw = () => [
  shadow(58, 97.5, 32),
  // far ear, standing straight, in shade
  `<path d="M40,58 C41,50 43,43 46,36" fill="none" stroke="${SHADE}" stroke-width="6.5" stroke-linecap="round"/>`,
  // round body: back and rump along the big curve, tucked-in hind foot at the bottom
  `<path d="M34,70 C45,62 55,59 65.7,59.1 C75.5,59.3 84.2,65 84.2,74 C84,87 72,95.5 52,96.5 C45,97 38,96 35,91 C31.5,85 31,76 34,70Z" fill="${FUR}"/>` +
    `<path d="M72,61.5 C80,65 84.2,69 84.2,74 C84,87 72,95.5 52,96.5 C66,91 77,80 72,61.5Z" fill="${SHADE}"/>` +
    `<path d="M56,97 C54,93 58,90.5 66,90.5 L74,90.5 C78,90.5 78.5,96.5 74,96.8Z" fill="${CREAM}"/>`,
  // fluffy tail on the rump
  `<circle cx="81.5" cy="86" r="5" fill="${CREAM}"/><path d="M84,90.3 C86,89 86.8,86.8 86.4,84.8" fill="none" stroke="#E2D2BE" stroke-width="1.6" stroke-linecap="round"/>`,
  // front paws
  `<ellipse cx="36" cy="95.5" rx="4.5" ry="2.4" fill="${CREAM}"/><ellipse cx="44" cy="96" rx="4.5" ry="2.4" fill="${CREAM}"/>`,
  // head, and the tall near ear rising along the upright stroke and flopping over along the top stroke
  `<path d="M33,58 C34.5,47 35.5,36 35.5,24 C35.5,16.5 40,14.5 45,15.5 C49.5,16.2 52.3,18 51.3,23" fill="none" stroke="${FUR}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M33.2,55 C34.3,46 35,37 35,26" fill="none" stroke="${PINK}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<ellipse cx="33" cy="66" rx="12" ry="10.5" fill="${FUR}"/>` +
    `<path d="M26,74 C32,77.5 40,76.5 44,70 C43,75.5 38,78.5 32,78 C29.5,77.8 27.5,76.5 26,74Z" fill="${SHADE}"/>`,
  // face looking left: eye, pink nose, cheek
  `<ellipse cx="28.5" cy="63.5" rx="1.8" ry="2.4" fill="${INK}"/><circle cx="28" cy="62.7" r=".6" fill="#fff"/>` +
    `<path d="M21.6,67.5 L24.4,67.2 L23.2,69.4Z" fill="#D9606E"/><circle cx="31" cy="70" r="2.3" fill="${PINK}" opacity=".8"/>`,
  // highlights
  `<path d="M24.5,60 C26,57 28.5,55.6 31.5,55.2" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M47,66.5 C53,63 58.5,61.8 64,61.8" fill="none" stroke="#FFF4EE" stroke-width="1.4" stroke-linecap="round"/>`,
];

export default draw;
