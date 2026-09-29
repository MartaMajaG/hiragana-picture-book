// え (e) illustration. Parts are layered back to front and bloom in one by one.
import type { Draw } from './types';
import { flower } from './helpers';
import { geo, r2 } from '../lib/geometry';

const draw: Draw = S=>{const g=geo(S[1]);const fl=[[.04,4.6,0],[.27,4,20],[.46,4.8,40],[.63,3.8,10],[.8,4.4,30],[.97,4.2,50]].map(([f,r,rot],i)=>{const [x,y]=g.at(f),a=g.ang(f),s=i%2?1:-1;return flower(x-Math.sin(a)*5*s,y+Math.cos(a)*5*s,r,rot);}).join('');
  const buds=[.15,.38,.72,.88].map((f,i)=>{const [x,y]=g.at(f),a=g.ang(f),s=i%2?-1:1;return `<circle cx="${r2(x-Math.sin(a)*4.2*s)}" cy="${r2(y+Math.cos(a)*4.2*s)}" r="1.7" fill="#E07A97"/>`;}).join('');
  return [
  `<circle cx="18" cy="16" r="7" fill="#F7E4B0" opacity=".7"/>`,
  `<path d="${S[1]}" fill="none" stroke="#5E4332" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${S[1]}" fill="none" stroke="#8B6A52" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M60,36 L66,26 M40,58 L34,52 M71,86 L76,78" stroke="#5E4332" stroke-width="2.2" stroke-linecap="round"/>`,
  buds, fl,
  `<path d="M58,17.5 L71,13 L69,21Z" fill="#6F8240"/><ellipse cx="51" cy="16" rx="10.5" ry="6.6" transform="rotate(8 51 16)" fill="#93A657"/><ellipse cx="50" cy="19" rx="7" ry="3.2" fill="#D9D7A8" opacity=".85"/><path d="M47,13 C53,7.5 60,9.5 63,15.5 C57,17 51,16.5 47,13Z" fill="#6F8240"/><circle cx="41.5" cy="12.5" r="5.4" fill="#93A657"/><path d="M36.6,11.8 L32.6,13 L36.6,14.2Z" fill="#2E2A22"/><circle cx="40.2" cy="11.8" r="1.8" fill="#fff"/><circle cx="40.2" cy="11.8" r="1" fill="#1B1E26"/>`,
  `<path d="M22,98 q2,-3 4,0" fill="none" stroke="#E07A97" stroke-width="1" /><circle cx="92" cy="60" r="1.8" fill="#F4A9BC"/><circle cx="16" cy="70" r="1.4" fill="#F4A9BC"/><ellipse cx="100" cy="46" rx="2" ry="1.2" transform="rotate(30 100 46)" fill="#F4A9BC"/>`
 ];};

export default draw;
