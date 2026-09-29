// く (ku) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { note } from './helpers';

const draw: Draw = S=>[
  note(10,24,'hsl(218 45% 55%)')+note(18,72,'hsl(218 45% 55%)')+note(4,48,'hsl(330 50% 62%)'),
  `<path d="M70,108 L117,108" stroke="#6B4A36" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="100" cy="86" rx="20" ry="21" fill="#5D6D8A"/><path d="M92,74 q8,4 16,0 M91,82 q9,4 18,0 M92,90 q8,4 16,0" fill="none" stroke="#E7E3D6" stroke-width="1.2" opacity=".7"/><path d="M106,100 L100,110 M112,98 L108,110" stroke="#E0A13A" stroke-width="1.8" stroke-linecap="round"/>`,
  `<circle cx="86" cy="53" r="23" fill="url(#gBird)"/><path d="M78,31 C80,24 86,23 88,28 C90,22 96,23 95,31" fill="#63748F"/>`,
  `<path d="M70,31 L60,17 L41.5,48 L69,45Z" fill="#F2B43E"/><path d="M69,62 L41.5,55.5 L58.5,86.5 L70,72Z" fill="#E09A2B"/><path d="M69,45.5 L42,51.5 L69,61.5Z" fill="#B2323C"/><path d="M69,50 L55,52.5 L69,57Z" fill="#E8707A" opacity=".8"/>`,
  `<circle cx="83" cy="42" r="5.2" fill="#FFE9A8"/><circle cx="83.6" cy="42.3" r="3" fill="#1B1E26"/><circle cx="82.6" cy="41.2" r="1" fill="#fff"/>`
 ];

export default draw;
