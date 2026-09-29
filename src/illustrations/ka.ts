// か (ka) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';

const draw: Draw = S=>[
  `<ellipse cx="46" cy="31" rx="17" ry="7.5" transform="rotate(-16 46 31)" fill="#D4EBF4" fill-opacity=".75" stroke="#8FBBD0" stroke-width=".7"/><ellipse cx="58" cy="46" rx="15" ry="6.5" transform="rotate(30 58 46)" fill="#D4EBF4" fill-opacity=".65" stroke="#8FBBD0" stroke-width=".7"/><path d="M40,33 L58,26 M44,35 L60,33 M52,42 L66,52 M53,46 L63,56" stroke="#8FBBD0" stroke-width=".5"/>`,
  `<g fill="none" stroke="#3B3F4A" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round"><path d="M43,33 L30,24 L18,30"/><path d="M42,36 L30,40 L22,54"/><path d="M45,37 L56,54 L55,68"/><path d="M40,40 L34,58 L38,74"/><path d="M47,34 L64,30 L78,20"/><path d="M44,38 L50,62 L46,80"/></g>`,
  `<path d="${S[1]}" fill="none" stroke="#3B3F4A" stroke-width="5.2" stroke-linecap="round"/><path d="${S[1]}" fill="none" stroke="#EDE7D6" stroke-width="5.2" stroke-dasharray="2.6 4.2" stroke-dashoffset="-14"/>`,
  `<ellipse cx="46" cy="27" rx="4.4" ry="6.8" transform="rotate(24 46 27)" fill="#3B3F4A"/><circle cx="50" cy="17.5" r="4.4" fill="#3B3F4A"/><circle cx="51.5" cy="16.5" r="1.8" fill="#C0473F"/><path d="M53,14 L63,3" stroke="#3B3F4A" stroke-width="1" stroke-linecap="round"/><path d="M51,14 Q52,7 57,5 M49,14 Q46,7 49,3" fill="none" stroke="#3B3F4A" stroke-width=".6"/>`,
  `<g fill="none" stroke="hsl(190 55% 45%)" stroke-width="1.3" stroke-linecap="round" opacity=".8"><path d="M86,33 q6,7 3,16"/><path d="M92,28 q8,10 4,22"/><path d="M98,23 q10,13 5,29"/></g>`
 ];

export default draw;
