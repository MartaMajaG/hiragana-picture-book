// い (i) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { fish, bubbles, water } from './helpers';

const draw: Draw = S=>[
  water,
  `<path d="M6,110 C8,90 4,76 10,58" stroke="#6E9A57" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M12,110 C12,96 16,86 14,74" stroke="#89AE6A" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M104,110 C102,96 108,88 104,74" stroke="#6E9A57" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  fish(S[0],{w:13,body:'#56662F',belly:'#B7BE76',eyes:1}),
  fish(S[1],{w:12.5,body:'#6B7A38',belly:'#C4C882',eyes:1}),
  bubbles([[14,18,3],[9,9,1.8],[82,26,2.4],[88,17,1.5],[40,64,1.4]])
 ];

export default draw;
