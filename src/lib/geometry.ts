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
 * Deliberately forgiving: the stroke only has to sit roughly in the right place, and its shape is compared
 * after lining up its centre, size and tilt (up to MAX_TILT), so a stroke that is a little skewed, shifted,
 * small or big still counts. Direction still matters, so a backwards stroke is reported as 'reversed'.
 */
const MAX_TILT = (30 * Math.PI) / 180;

export function matchStroke(user: Pt[], d: string): StrokeMatch {
  const g = geo(d);
  const ref = Array.from({ length: 32 }, (_, k) => g.at(k / 31));
  const D = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const centre = (p: Pt[]): Pt => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
  const cu = centre(user), cr = centre(ref);

  // Where it sits: the centre must land near the reference stroke's centre.
  const place = Math.max(16, Math.min(26, g.L * 0.45));
  if (D(cu, cr) > place) return 'no';

  // How it's shaped: centre both, scale the user's stroke to the reference size, then turn it by the best-fitting tilt.
  const u = user.map(([x, y]): Pt => [x - cu[0], y - cu[1]]);
  const r = ref.map(([x, y]): Pt => [x - cr[0], y - cr[1]]);
  const spread = (p: Pt[]) => Math.sqrt(p.reduce((s, [x, y]) => s + x * x + y * y, 0) / p.length) || 1;
  const scale = Math.max(0.5, Math.min(2, spread(r) / spread(u)));
  const shape = Math.max(8, Math.min(13, g.L * 0.18));

  const fit = (target: Pt[]) => {
    let dot = 0, cross = 0;
    u.forEach(([x, y], k) => { dot += x * target[k][0] + y * target[k][1]; cross += x * target[k][1] - y * target[k][0]; });
    const a = Math.max(-MAX_TILT, Math.min(MAX_TILT, Math.atan2(cross, dot)));
    const cos = Math.cos(a) * scale, sin = Math.sin(a) * scale;
    return u.reduce((s, [x, y], k) => s + D([x * cos - y * sin, x * sin + y * cos], target[k]), 0) / 32;
  };

  if (fit(r) < shape) return 'ok';
  if (fit([...r].reverse()) < shape) return 'reversed';
  return 'no';
}
