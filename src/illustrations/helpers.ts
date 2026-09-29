// Shared drawing helpers for the kana illustrations.
// Everything is drawn in KanjiVG's 109 x 109 coordinate space, so a picture lines up with its character's strokes.
import { geo, r2, deg } from '../lib/geometry';

export interface FishOpts {
  w: number; body: string; spot?: string; dash?: string; off?: number; belly?: string;
  tail?: string; fins?: boolean; fin?: string; finAt?: number; eyes?: 1 | 2;
}

export function fish(d: string, o: FishOpts): string {
  const g=geo(d), w=o.w, out: string[]=[];
  const [sx,sy]=g.at(0), a0=g.ang(0.004);
  const ux=-Math.cos(a0), uy=-Math.sin(a0), nx=-Math.sin(a0), ny=Math.cos(a0);
  if(o.fins){
    const [px,py]=g.at(o.finAt||.2), a=g.ang(o.finAt||.2);
    for(const s of [1,-1]){
      const cx=px+s*(-Math.sin(a))*w*.62, cy=py+s*Math.cos(a)*w*.62;
      out.push(`<ellipse cx="${r2(cx)}" cy="${r2(cy)}" rx="${r2(w*.55)}" ry="${r2(w*.22)}" transform="rotate(${deg(a)+s*38} ${r2(cx)} ${r2(cy)})" fill="${o.fin}" opacity=".9" stroke="#C9B8A0" stroke-width=".4"/>`);
    }
  }
  if(o.tail){
    const [ex,ey]=g.at(1), ae=g.ang(.999);
    out.push(`<path transform="translate(${r2(ex)} ${r2(ey)}) rotate(${deg(ae)})" d="M${r2(w*.15)},0 C${r2(w*.6)},${r2(-w*.3)} ${r2(w*1.0)},${r2(-w*1.1)} ${r2(w*1.5)},${r2(-w*1.0)} Q${r2(w*1.1)},0 ${r2(w*1.5)},${r2(w*1.0)} C${r2(w*1.0)},${r2(w*1.1)} ${r2(w*.6)},${r2(w*.3)} ${r2(w*.15)},0Z" fill="${o.tail}" opacity=".92"/>`);
  }
  out.push(`<path d="${d}" fill="none" stroke="${o.body}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`);
  if(o.spot) out.push(`<path d="${d}" fill="none" stroke="${o.spot}" stroke-width="${r2(w*.74)}" stroke-dasharray="${o.dash}" stroke-dashoffset="${o.off||-3}" stroke-linecap="round"/>`);
  if(o.belly) out.push(`<path d="${d}" fill="none" stroke="${o.belly}" stroke-width="${r2(w*.3)}" stroke-linecap="round" opacity=".8"/>`);
  if(o.eyes===2){
    for(const s of [1,-1]){const ex=sx+ux*w*.1+s*nx*w*.26, ey=sy+uy*w*.1+s*ny*w*.26;
      out.push(`<circle cx="${r2(ex)}" cy="${r2(ey)}" r="${r2(w*.11)}" fill="#1B1E26"/><circle cx="${r2(ex-w*.03)}" cy="${r2(ey-w*.03)}" r="${r2(w*.035)}" fill="#fff"/>`);}
  } else if(o.eyes===1){
    const ex=sx+ux*w*.12-nx*w*.14, ey=sy+uy*w*.12-ny*w*.14;
    out.push(`<circle cx="${r2(ex)}" cy="${r2(ey)}" r="${r2(w*.17)}" fill="#F5F0DC"/><circle cx="${r2(ex)}" cy="${r2(ey)}" r="${r2(w*.09)}" fill="#1B1E26"/>`);
  }
  return out.join('');
}
export function flower(x: number,y: number,r: number,rot=0,petal='#F4A9BC',mid='#C8456A'){
  let s=`<g transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})">`;
  for(let i=0;i<5;i++){const a=i*72*Math.PI/180;s+=`<circle cx="${r2(Math.cos(a)*r*.58)}" cy="${r2(Math.sin(a)*r*.58)}" r="${r2(r*.52)}" fill="${petal}"/>`;}
  s+=`<circle r="${r2(r*.32)}" fill="#FBE7A1"/><circle r="${r2(r*.16)}" fill="${mid}"/>`;
  return s+'</g>';
}
export function star(x: number,y: number,s: number,c='#FFE3A3'){return `<path d="M${x},${y-s} Q${x+s*.18},${y-s*.18} ${x+s},${y} Q${x+s*.18},${y+s*.18} ${x},${y+s} Q${x-s*.18},${y+s*.18} ${x-s},${y} Q${x-s*.18},${y-s*.18} ${x},${y-s}Z" fill="${c}"/>`;}
export function note(x: number,y: number,c: string){return `<g transform="translate(${x} ${y})" fill="${c}" stroke="${c}"><ellipse cx="0" cy="8" rx="3.1" ry="2.3" transform="rotate(-22 0 8)" stroke="none"/><path d="M2.7,7.4 V-3.5 Q6,-2 7.5,1.5" fill="none" stroke-width="1.1" stroke-linecap="round"/></g>`;}
export function bubbles(list: [number,number,number][]){return list.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#CFEAF3" fill-opacity=".35" stroke="#7FBBD2" stroke-width=".6"/><circle cx="${x-r*.35}" cy="${y-r*.35}" r="${r*.25}" fill="#fff" opacity=".8"/>`).join('');}
export const water=`<path d="M-8,96 q7,-3.5 14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0" fill="none" stroke="#7FB3CC" stroke-width="1" opacity=".55"/><path d="M-4,104 q7,-3 14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0 t14,0" fill="none" stroke="#7FB3CC" stroke-width="1" opacity=".4"/>`;

