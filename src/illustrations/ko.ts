// こ (ko) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { fish, flower, bubbles } from './helpers';

const draw: Draw = S=>[
  `<circle cx="54.5" cy="56" r="56" fill="url(#gPond)" opacity=".55"/>`,
  `<ellipse cx="54" cy="52" rx="44" ry="30" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/><ellipse cx="54" cy="52" rx="30" ry="18" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".7"/>`,
  `<path d="M100,40 A12,12 0 1 1 93,29 L99,39Z" fill="#5E9E6E"/><path d="M99,39 L92,30" stroke="#3E7552" stroke-width=".6"/>${flower(90,44,4.2,10,'#F7B8C6','#E07A97')}<path d="M16,100 A8,8 0 1 1 22,94 L17,99Z" fill="#6FAE7C"/>`,
  fish(S[0],{w:11.5,body:'#FBF7EF',spot:'#E8622C',dash:'6 5 3 7',off:-4,tail:'#FBF7EF',fins:true,fin:'#FBF7EF',eyes:2}),
  fish(S[1],{w:12,body:'#F29A3B',spot:'#FBF3E4',dash:'4 7',off:-8,tail:'#F29A3B',fins:true,fin:'#F7B966',eyes:2}),
  bubbles([[24,18,1.6],[84,72,1.2]])
 ];

export default draw;
