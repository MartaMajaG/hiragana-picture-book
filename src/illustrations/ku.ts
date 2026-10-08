// く (ku) illustration: a cuckoo singing with its beak wide open. Ku as in cuckoo.
// The corner of the angle is where the beak meets the head; the two arms are the open beak, with the song coming out.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { note, shadow } from './helpers';

const FEATHER = '#7F8FAA', SHADE = '#5D6D8A', CREAM = '#EDE8DA', BEAK = '#F2B43E', BEAK_SHADE = '#D99526';

const draw: Draw = () => [
  shadow(24, 104, 20),
  // the song coming out of the open beak
  note(66,40,SHADE)+note(80,56,SHADE)+note(68,68,SHADE),
  // tail, body with a barred chest, feet on the branch
  `<path d="M12,86 C8,92 5,98 3,104 L10,104 C12,98 15,93 18,90Z" fill="${SHADE}"/>` +
    `<ellipse cx="23" cy="80" rx="14" ry="18" fill="${FEATHER}"/>` +
    `<path d="M28,64 C35,69 38,78 35,88 C33,94 28,97 23,98 C32,90 34,76 28,64Z" fill="${SHADE}"/>` +
    `<path d="M24,72 q5,2 10,0 M23,78 q6,2 12,0 M23,84 q5.5,2 11,0 M24,90 q4.5,2 9,0" fill="none" stroke="${CREAM}" stroke-width="1.3" stroke-linecap="round"/>` +
    `<path d="M20,97 L18,103 M26,97 L27,103" stroke="#E0A13A" stroke-width="1.8" stroke-linecap="round"/>`,
  // head
  `<circle cx="25" cy="52" r="13.5" fill="${FEATHER}"/><path d="M14,58 C18,64 26,66 33,62 C29,66.5 20,67 15,62Z" fill="${SHADE}"/>`,
  // the open beak along the two arms of the stroke, a little tongue at the corner
  `<path d="M40,52.5 L48,52 L40.5,56Z" fill="#B2323C"/>` +
    `<path d="M33,46.5 C43,35 53,24 60.5,15.5 C56,27 49,40 41,52Z" fill="${BEAK}"/>` +
    `<path d="M34,58 C46,69 55,82 62,93.5 C56,84 49,72 41,55.5Z" fill="${BEAK_SHADE}"/>`,
  // eye and highlight
  `<circle cx="27" cy="48" r="4.2" fill="#FFE9A8"/><circle cx="27.8" cy="48" r="2.5" fill="#1B1E26"/><circle cx="27" cy="47" r=".9" fill="#fff"/>` +
    `<path d="M16,46 C17,42 19.5,40 22.5,39" fill="none" stroke="#FFF4EE" stroke-width="1.3" stroke-linecap="round"/>`,
];

export default draw;
