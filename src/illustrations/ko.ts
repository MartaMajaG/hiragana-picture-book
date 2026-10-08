// こ (ko) illustration: two koi circling each other. Ko as in koi.
// Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { fish } from './helpers';

const draw: Draw = S=>[
  fish(S[0],{w:11.5,body:'#E8622C',spot:'#FBF7EF',dash:'5 6 3 8',off:-4,tail:'#E8622C',fins:true,fin:'#F08A5A',eyes:2}),
  fish(S[1],{w:12,body:'#EDB63A',spot:'#FBF3E4',dash:'4 7',off:-8,tail:'#EDB63A',fins:true,fin:'#F5CC6A',eyes:2})
 ];

export default draw;
