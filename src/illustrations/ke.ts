// け (ke) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { fish, bubbles } from './helpers';
import { geo, r2, deg } from '../lib/geometry';

const draw: Draw = S=>{const leaf=(d,fs)=>{const g=geo(d);return fs.map(([f,s,l])=>{const [x,y]=g.at(f),a=g.ang(f);return `<ellipse cx="${r2(x+Math.cos(a+s*1.1)*l*.55)}" cy="${r2(y+Math.sin(a+s*1.1)*l*.55)}" rx="${r2(l*.55)}" ry="${r2(l*.2)}" transform="rotate(${deg(a+s*1.1)} ${r2(x+Math.cos(a+s*1.1)*l*.55)} ${r2(y+Math.sin(a+s*1.1)*l*.55)})" fill="#5E9E6E"/>`;}).join('');};
  return [
  `<rect x="-8" y="-8" width="125" height="125" fill="url(#gWater)"/>`,
  `<ellipse cx="18" cy="110" rx="20" ry="7" fill="#7C8794"/><ellipse cx="86" cy="112" rx="26" ry="8" fill="#6B7684"/><ellipse cx="60" cy="114" rx="10" ry="4" fill="#8F99A5"/>`,
  leaf(S[0],[[.25,1,12],[.45,-1,11],[.7,1,10]])+leaf(S[2],[[.2,-1,12],[.45,1,13],[.7,-1,11],[.88,1,9]]),
  `<path d="${S[0]}" fill="none" stroke="#3B7552" stroke-width="8" stroke-linecap="round"/><path d="${S[0]}" fill="none" stroke="#7FBA8B" stroke-width="2" stroke-linecap="round" opacity=".8"/><path d="${S[2]}" fill="none" stroke="#3B7552" stroke-width="8" stroke-linecap="round"/><path d="${S[2]}" fill="none" stroke="#7FBA8B" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
  fish(S[1],{w:9,body:'#F2A23A',spot:'#FFF4E0',dash:'2.4 6',off:-6,tail:'#E0782A',fins:true,fin:'#E0782A',finAt:.3,eyes:1}),
  bubbles([[46,30,2.2],[42,22,1.6],[45,14,1.1],[98,58,1.8]])
 ];};

export default draw;
