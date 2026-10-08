import { useEffect, useMemo, useState } from 'react';
import { STROKES, type Kana } from '../data/kana';
import { badgePos, geo, r2 } from '../lib/geometry';
import { halo, illustrationMarkup } from '../lib/illustration';
import { prefersReducedMotion } from '../lib/motion';

interface Props {
  kana: Kana;
  /** Show the picture once the strokes are written. */
  picture: boolean;
  /** Show stroke numbers as each stroke starts. */
  numbers?: boolean;
  /** Change this value to replay the stroke animation. */
  replayKey?: number;
  speed?: number;
  label?: string;
}

/** Writes a kana stroke by stroke, then lets its picture bloom in behind the ink. */
export default function KanaStage({ kana, picture, numbers = false, replayKey = 0, speed = 1, label }: Props) {
  const strokes = STROKES[kana.kana];
  const art = useMemo(() => illustrationMarkup(kana), [kana]);
  const badges = useMemo(() => strokes.map((_, i) => badgePos(strokes, i)), [strokes]);
  const durations = useMemo(() => strokes.map((d) => Math.min(1100, 280 + geo(d).L * 5) / speed), [strokes, speed]);

  const [started, setStarted] = useState(0);
  const [written, setWritten] = useState(false);

  useEffect(() => {
    setStarted(0);
    setWritten(false);
    if (prefersReducedMotion()) {
      setStarted(strokes.length);
      setWritten(true);
      return;
    }
    const timers: number[] = [];
    let at = 180;
    durations.forEach((dur, i) => {
      timers.push(window.setTimeout(() => setStarted(i + 1), at));
      at += dur + 140 / speed;
    });
    timers.push(window.setTimeout(() => setWritten(true), at + 60));
    return () => timers.forEach(clearTimeout);
  }, [kana, replayKey, durations, strokes.length, speed]);

  return (
    <svg
      className={`stage${picture && written ? ' show' : ''}`}
      viewBox="-8 -8 125 125"
      role="img"
      aria-label={label ?? `${kana.kana}, read ${kana.romaji}. ${kana.title}.`}
    >
      <circle cx="54.5" cy="56" r="52" style={{ fill: halo(kana.hue) }} />
      <g dangerouslySetInnerHTML={{ __html: art }} />
      {/* a thin rim of paper under the ink, so the character stays crisp over the picture */}
      <g className="ink-halo">
        {strokes.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className="ink">
        {strokes.map((d, i) => (
          <path
            key={`${kana.romaji}-${replayKey}-${i}`}
            d={d}
            pathLength={1}
            className={i < started ? 'drawn' : ''}
            style={{ ['--dur' as string]: `${durations[i]}ms` }}
          />
        ))}
      </g>
      {numbers && (
        <g className="badges">
          {badges.map(([x, y], i) => (
            <g key={i} className={i < started ? 'on' : ''}>
              <circle cx={r2(x)} cy={r2(y)} r={3.4} />
              <text x={r2(x)} y={r2(y)}>{i + 1}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
