// い (i) illustration: two eels swimming side by side. Ee as in eel.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { fish } from './helpers';

const draw: Draw = S=>[
  fish(S[0],{w:13,body:'#56662F',belly:'#B7BE76',eyes:1}),
  fish(S[1],{w:12.5,body:'#6B7A38',belly:'#C4C882',eyes:1}),
 ];

export default draw;
