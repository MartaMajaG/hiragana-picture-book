import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { STROKES, type Kana } from '../data/kana';
import { badgePos, geo, matchStroke, r2, resample, type Pt } from '../lib/geometry';
import { halo, illustrationMarkup } from '../lib/illustration';

export type TracePhase = 'trace' | 'memory' | 'done';

interface Props {
  kana: Kana;
  phase: TracePhase;
  onPhaseChange: (p: TracePhase) => void;
  onFeedback: (text: string) => void;
  onProgress: (strokeIndex: number) => void;
  /** Increment to replay the hint for the current stroke ("Show me"). */
  hintKey: number;
}

const PRAISE = ['Good.', 'Nice.', 'Clean stroke.', 'Yes.'];

/**
 * A writing pad for one kana. The learner draws each stroke with a pointer (mouse, trackpad, finger or pen).
 * Each attempt is checked against the reference stroke for order, direction and shape.
 */
export default function TracePad({ kana, phase, onPhaseChange, onFeedback, onProgress, hintKey }: Props) {
  const strokes = STROKES[kana.kana];
  const art = useMemo(() => illustrationMarkup(kana), [kana]);
  const svgRef = useRef<SVGSVGElement>(null);
  const liveRef = useRef<SVGPathElement>(null);
  const pts = useRef<Pt[] | null>(null);

  const [done, setDone] = useState(0); // strokes completed in the current phase
  const [miss, setMiss] = useState(0);
  const [missFlash, setMissFlash] = useState(false);
  const [hint, setHint] = useState<{ i: number; n: number } | null>(null);

  // reset when the character or the phase changes
  useEffect(() => {
    if (phase === 'done') return; // keep the learner's finished character on screen
    setDone(0);
    setHint(null);
    if (phase === 'trace') setMiss(0);
  }, [kana, phase]);
  useEffect(() => onProgress(done), [done, onProgress]);

  const showHint = useCallback((i: number) => setHint((h) => ({ i, n: (h?.n ?? 0) + 1 })), []);
  useEffect(() => {
    if (hintKey > 0 && phase !== 'done') showHint(done);
  }, [hintKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const toSvg = (e: { clientX: number; clientY: number }): Pt => {
    const svg = svgRef.current!;
    const p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(svg.getScreenCTM()!.inverse());
    return [q.x, q.y];
  };
  const drawLive = () => {
    const p = pts.current;
    liveRef.current?.setAttribute('d', p && p.length ? 'M' + p.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' L') : '');
  };

  function evaluate(path: Pt[]) {
    const { points, length } = resample(path, 32);
    if (length < 3) return drawLive();
    const i = done;
    const result = matchStroke(points, strokes[i]);

    if (result === 'ok') {
      pts.current = null;
      drawLive();
      const next = i + 1;
      setDone(next);
      if (next < strokes.length) {
        onFeedback(PRAISE[next % PRAISE.length]);
      } else if (phase === 'trace') {
        onFeedback(`That's ${kana.kana}. Now write it again without the guide.`);
        window.setTimeout(() => onPhaseChange('memory'), 1100);
      } else {
        onFeedback(
          miss === 0 ? 'Written from memory with no slips.' : `Written from memory, with ${miss} ${miss === 1 ? 'retry' : 'retries'}.`,
        );
        onPhaseChange('done');
      }
      return;
    }

    setMiss((m) => m + 1);
    setMissFlash(true);
    window.setTimeout(() => {
      setMissFlash(false);
      pts.current = null;
      drawLive();
    }, 700);
    showHint(i);
    if (result === 'reversed') return onFeedback('Right shape, wrong direction. Start at the pulsing dot.');
    const other = strokes.findIndex((d, j) => j !== i && matchStroke(points, d) === 'ok');
    if (other > i) return onFeedback(`That's stroke ${other + 1}. Stroke ${i + 1} comes first, watch.`);
    if (other >= 0) return onFeedback(`You already wrote that one. Stroke ${i + 1} is next, watch.`);
    onFeedback(`Not quite. Watch stroke ${i + 1}, then try again.`);
  }

  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (phase === 'done') return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setMissFlash(false);
    pts.current = [toSvg(e)];
    drawLive();
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!pts.current) return;
    const native = e.nativeEvent;
    const evs = native.getCoalescedEvents?.() ?? [];
    for (const ev of evs.length ? evs : [native]) {
      const p = toSvg(ev);
      const last = pts.current[pts.current.length - 1];
      if (Math.hypot(p[0] - last[0], p[1] - last[1]) > 0.6) pts.current.push(p);
    }
    drawLive();
  };
  const onUp = () => {
    if (!pts.current) return;
    const path = pts.current;
    evaluate(path);
  };
  const onCancel = () => {
    pts.current = null;
    drawLive();
  };

  const current = done < strokes.length && phase !== 'done' ? done : -1;
  const badge = current >= 0 ? badgePos(strokes, current) : null;
  const start = current >= 0 ? geo(strokes[current]).at(0) : null;

  return (
    <svg
      ref={svgRef}
      className={`stage pad ${phase}${phase === 'done' ? ' show' : ''}`}
      viewBox="-8 -8 125 125"
      role="img"
      aria-label={`Writing pad for ${kana.kana}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
    >
      <circle cx="54.5" cy="56" r="52" fill={halo(kana.hue, 0.12)} />
      <g dangerouslySetInnerHTML={{ __html: art }} />
      <path className="grid" d="M54.5,2 V107 M2,54.5 H107" />
      <rect className="grid" x="2" y="2" width="105" height="105" rx="4" />
      <g className="guide">
        {strokes.map((d, i) => (
          <path key={i} d={d} className={i === current ? 'cur' : ''} />
        ))}
      </g>
      <g className="ink">
        {strokes.slice(0, done).map((d, i) => (
          <path key={`${phase === 'done' ? 'memory' : phase}-${i}`} d={d} pathLength={1} className="drawn quick" />
        ))}
      </g>
      {hint && hint.i < strokes.length && (
        <path key={hint.n} className="hint" d={strokes[hint.i]} pathLength={1} onAnimationEnd={() => setHint(null)} />
      )}
      <path ref={liveRef} className={`live${missFlash ? ' miss' : ''}`} />
      {phase === 'trace' && start && badge && (
        <g className="next">
          <circle className="pulse" cx={r2(start[0])} cy={r2(start[1])} r={2} />
          <circle cx={r2(badge[0])} cy={r2(badge[1])} r={3.4} />
          <text x={r2(badge[0])} y={r2(badge[1])}>{current + 1}</text>
        </g>
      )}
    </svg>
  );
}
