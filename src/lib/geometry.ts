// Path geometry in KanjiVG's 109 x 109 space: measuring strokes, placing stroke numbers,
// and comparing what the learner draws with the reference stroke.

const NS = 'http://www.w3.org/2000/svg';
let host: SVGSVGElement | null = null;
const cache = new Map<string, SVGPathElement>();

function measurePath(d: string): SVGPathElement {
  let p = cache.get(d);
  if (p) return p;
  if (!host) {
    host = document.createElementNS(NS, 'svg');
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    document.body.appendChild(host);
  }
  p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d);
  host.appendChild(p);
  cache.set(d, p);
  return p;
}

export type Pt = [number, number];

export function geo(d: string) {
  const p = measurePath(d);
  const L = p.getTotalLength();
  const at = (f: number): Pt => {
    const q = p.getPointAtLength(Math.max(0, Math.min(1, f)) * L);
    return [q.x, q.y];
  };
  const ang = (f: number) => {
    const a = p.getPointAtLength(Math.max(0, f * L - 0.9));
    const b = p.getPointAtLength(Math.min(L, f * L + 0.9));
    return Math.atan2(b.y - a.y, b.x - a.x);
  };
  return { L, at, ang };
}

export const r2 = (n: number) => Math.round(n * 100) / 100;
export const deg = (a: number) => r2((a * 180) / Math.PI);

/** Where to put the number badge for stroke i: near its start, as far as possible from any ink. */
export function badgePos(strokes: string[], i: number): Pt {
  const samples = strokes.flatMap((d) => {
    const g = geo(d);
    return Array.from({ length: 41 }, (_, k) => g.at(k / 40));
  });
  const [x, y] = geo(strokes[i]).at(0);
  let best: Pt = [x, y];
  let bestDist = -1;
  for (let k = 0; k < 16; k++) {
    const a = (k * Math.PI) / 8;
    const cx = x + Math.cos(a) * 6.5;
    const cy = y + Math.sin(a) * 6.5;
    let nearest = Infinity;
    for (const [px, py] of samples) nearest = Math.min(nearest, Math.hypot(px - cx, py - cy));
    if (nearest > bestDist) {
      bestDist = nearest;
      best = [cx, cy];
    }
  }
  return best;
}

/** Resample a freehand polyline into N evenly spaced points. */
export function resample(pts: Pt[], N = 32): { points: Pt[]; length: number } {
  const cum = [0];
  for (let k = 1; k < pts.length; k++) {
    cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  }
  const length = cum[cum.length - 1];
  if (pts.length < 2) return { points: Array.from({ length: N }, () => pts[0] ?? [0, 0]), length: 0 };
  const points: Pt[] = [];
  let j = 0;
  for (let k = 0; k < N; k++) {
    const t = (length * k) / (N - 1);
    while (j < cum.length - 2 && cum[j + 1] < t) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    const f = (t - cum[j]) / seg;
    points.push([pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f]);
  }
  return { points, length };
}

export type StrokeMatch = 'ok' | 'reversed' | 'no';

/**
 * Compare a resampled user stroke (32 points) with a reference stroke.
 * Checks the start point, the end point and the overall shape; tolerances scale with stroke length
 * so short ticks and long sweeps are judged fairly.
 */
export function matchStroke(user: Pt[], d: string): StrokeMatch {
  const g = geo(d);
  const ref = Array.from({ length: 32 }, (_, k) => g.at(k / 31));
  const tol = Math.max(13, Math.min(20, g.L * 0.35));
  const shape = Math.max(9, Math.min(14, g.L * 0.2));
  const D = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const mean = user.reduce((s, p, k) => s + D(p, ref[k]), 0) / 32;
  const rmean = user.reduce((s, p, k) => s + D(p, ref[31 - k]), 0) / 32;
  if (D(user[0], ref[0]) < tol && D(user[31], ref[31]) < tol && mean < shape) return 'ok';
  if (D(user[0], ref[31]) < tol && D(user[31], ref[0]) < tol && rmean < shape) return 'reversed';
  return 'no';
}
