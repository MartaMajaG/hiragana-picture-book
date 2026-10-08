import { useEffect, useRef, useState } from 'react';
import StickerArt, { tiltFor } from '../components/StickerArt';
import { STICKER_GROUPS, STICKERS, type Sticker, type StickerGroup } from '../data/stickers';
import { currentStreak, type Progress } from '../lib/progress';
import { KANA } from '../data/kana';

interface AlbumProps {
  progress: Progress;
  onOpenPurse: () => void;
  /** The sticker being stuck in right now, if any. */
  placing: string | null;
  onPlace: (id: string | null) => void;
  onPlaced: (id: string) => void;
}

/** The sticker album: two pages of slots, filled in by hand as stickers are earned. */
export default function Album({ progress, onOpenPurse, placing, onPlace, onPlaced }: AlbumProps) {
  const earned = STICKERS.filter((s) => progress.stickers[s.id]).length;
  const streak = currentStreak(progress);
  // The nearest stickers still to earn, to give a reason to keep going.
  const next = STICKERS.filter((s) => !progress.stickers[s.id] && !s.secret)
    .map((s) => ({ s, g: s.goal(progress) }))
    .sort((a, b) => b.g[0] / b.g[1] - a.g[0] / a.g[1])
    .slice(0, 3);
  const half = [STICKER_GROUPS.slice(0, 3), STICKER_GROUPS.slice(3)];

  return (
    <section className="album" aria-labelledby="album-h">
      <div className="review-bar">
        <div>
          <h1 id="album-h">Sticker album</h1>
          <p>
            {earned} of {STICKERS.length} stickers collected. Learn, write and review to earn mon and fill the pages.
          </p>
        </div>
        <ul className="stats" aria-label="Your progress">
          <li>
            <button type="button" className="stat-button" onClick={onOpenPurse}>
              <span className="stat-icon coin" lang="ja" aria-hidden="true">文</span>
              <span className="stat-text">
                <b>{progress.mon}</b>
                <small>mon earned · open purse</small>
              </span>
            </button>
          </li>
          <li>
            <span className="stat-icon" lang="ja" aria-hidden="true">日</span>
            <span className="stat-text">
              <b>{streak}</b>
              <small>{streak === 1 ? 'day' : 'days'} in a row</small>
            </span>
          </li>
          <li>
            <span className="stat-icon" lang="ja" aria-hidden="true">連</span>
            <span className="stat-text">
              <b>{progress.bestRun}</b>
              <small>best run of right answers</small>
            </span>
          </li>
          <li>
            <span className="stat-icon" lang="ja" aria-hidden="true">書</span>
            <span className="stat-text">
              <b>
                {progress.written.length}
                <span className="of"> / {KANA.length}</span>
              </b>
              <small>characters written</small>
              <span className="bar" aria-hidden="true">
                <span style={{ width: `${(progress.written.length / KANA.length) * 100}%` }} />
              </span>
            </span>
          </li>
        </ul>
      </div>

      {next.length > 0 && (
        <ul className="next-up" aria-label="Closest stickers">
          {next.map(({ s, g }) => (
            <li key={s.id}>
              <span className="nu-art">
                <StickerArt id={s.id} size={76} tilt={tiltFor(s.id)} />
              </span>
              <span className="nu-text">
                <b>
                  <span lang="ja">{s.jp}</span> {s.name}
                </b>{' '}
                {s.how}
                <span className="bar" aria-hidden="true">
                  <span style={{ width: `${Math.min(100, (g[0] / g[1]) * 100)}%` }} />
                </span>
              </span>
              <span className="nu-count">
                {Math.min(g[0], g[1])}/{g[1]}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="book">
        <div className="spread album-spread">
          {half.map((groups, i) => (
            <div className="album-page" key={i}>
              {groups.map((g) => (
                <Group key={g.title} group={g} progress={progress} placing={placing} onPlace={onPlace} />
              ))}
            </div>
          ))}
          <span className="folio l" lang="ja" aria-hidden="true">
            帖
          </span>
        </div>
      </div>
      {placing && <Placement id={placing} onCancel={() => onPlace(null)} onPlaced={onPlaced} />}
    </section>
  );
}

/**
 * Sticking a sticker in by hand: it waits on its backing paper at the bottom of the screen; drag it onto the glowing
 * spot in the album and let go. Close enough and it snaps in and presses flat; otherwise it springs back.
 * A button does the same for keyboard and screen-reader users.
 */
function Placement({ id, onCancel, onPlaced }: { id: string; onCancel: () => void; onPlaced: (id: string) => void }) {
  const s = STICKERS.find((x) => x.id === id);
  const home = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [snap, setSnap] = useState<{ x: number; y: number } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const target = () => document.querySelector<HTMLElement>(`[data-slot="${id}"] .ghost`);
  // bring the waiting spot into view
  useEffect(() => {
    target()?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [id]);

  const finish = () => {
    const t = target()?.getBoundingClientRect();
    const h = home.current?.getBoundingClientRect();
    if (t && h) setSnap({ x: t.left + t.width / 2 - (h.left + h.width / 2), y: t.top + t.height / 2 - (h.top + h.height / 2) });
    window.setTimeout(() => onPlaced(id), 520);
  };
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0 });
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    start.current = null;
    const t = target()?.getBoundingClientRect();
    const near = t && Math.hypot(e.clientX - (t.left + t.width / 2), e.clientY - (t.top + t.height / 2)) < Math.max(70, t.width * 0.7);
    if (near) finish();
    else setDrag(null);
  };
  if (!s) return null;
  const offset = snap ?? drag;
  return (
    <div className="placement" role="region" aria-label={`Stick ${s.name} into the album`}>
      <div className="placement-card">
        <div
          ref={home}
          className={`placement-sticker${drag ? ' dragging' : ''}${snap ? ' snapping' : ''}`}
          style={offset ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
          onPointerDown={snap ? undefined : onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={() => { start.current = null; setDrag(null); }}
        >
          <StickerArt id={s.id} size={120} shine={drag ? { x: 0.4, y: 0.3 } : null} />
        </div>
        <div className="placement-text">
          <b>
            <span lang="ja">{s.jp}</span> {s.name}
          </b>
          <span>Drag the sticker onto its glowing spot in the album.</span>
          <span className="placement-actions">
            <button type="button" className="btn small" onClick={finish} disabled={!!snap}>
              Stick it here
            </button>
            <button type="button" className="btn small ghost" onClick={onCancel}>
              Later
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function Group({ group, progress, placing, onPlace }: { group: StickerGroup; progress: Progress; placing: string | null; onPlace: (id: string) => void }) {
  return (
    <section className="sticker-group">
      <h2>
        <span className="seal" lang="ja" aria-hidden="true">
          {group.jp}
        </span>
        {group.title}
      </h2>
      <div className="slots">
        {group.stickers.map((s) => (
          <Slot key={s.id} sticker={s} progress={progress} placing={placing} onPlace={onPlace} />
        ))}
      </div>
    </section>
  );
}

function Slot({ sticker: s, progress, placing, onPlace }: { sticker: Sticker; progress: Progress; placing: string | null; onPlace: (id: string) => void }) {
  const when = progress.stickers[s.id];
  // earned but not stuck in yet: the spot glows, waiting for the sticker
  if (when && progress.toStick.includes(s.id)) {
    return (
      <div className={`slot pending${placing === s.id ? ' target' : ''}`} data-slot={s.id}>
        <div className="ghost halo" aria-hidden="true">
          <StickerArt id={s.id} size={112} />
        </div>
        <span className="slot-jp" lang="ja">{s.jp}</span>
        <span className="slot-name">{s.name}</span>
        {placing !== s.id && (
          <button type="button" className="btn small stick-now" onClick={() => onPlace(s.id)}>
            Stick it in
          </button>
        )}
      </div>
    );
  }
  const [have, need] = s.goal(progress);
  if (!when) {
    return (
      <div className={`slot locked${s.secret ? ' secret' : ''}`}>
        <div className="ghost" aria-hidden="true">
          {s.secret ? '?' : <StickerArt id={s.id} size={112} />}
        </div>
        <span className="slot-jp" lang="ja">{s.secret ? '？' : s.jp}</span>
        <span className="slot-name">{s.secret ? 'Secret sticker' : s.name}</span>
        <span className="slot-how">{s.how}</span>
        {!s.secret && (
          <span className="slot-progress" aria-label={`${Math.min(have, need)} of ${need}`}>
            <span className="bar" aria-hidden="true">
              <span style={{ width: `${Math.min(100, (have / need) * 100)}%` }} />
            </span>
            <span className="count">
              {Math.min(have, need)}/{need}
            </span>
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="slot earned egg" tabIndex={0}>
      <LiftingSticker id={s.id} />
      <span className="slot-jp" lang="ja">{s.jp}</span>
      <span className="slot-name">{s.name}</span>
      <span className="egg-note up" role="tooltip">
        <b lang="ja">{s.jp}</b> <i>{s.reading}</i> · {s.name}
        <span className="egg-fact">{s.note}</span>
        <span className="earned-stamp">
          <span className="sumi" lang="ja" aria-hidden="true">済</span>
          Earned {new Date(when).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="earned-how">{s.how}</span>
      </span>
    </div>
  );
}

/**
 * An earned sticker you can play with: it lifts off the page, tilts towards the pointer and catches the light like vinyl.
 * Pressing it lifts it a little further, as if you'd started to peel it.
 */
function LiftingSticker({ id }: { id: string }) {
  const [p, setP] = useState<{ x: number; y: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  const move = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  const style = p
    ? ({ ['--rx' as string]: `${(p.x - 0.5) * 22}deg`, ['--ry' as string]: `${(0.5 - p.y) * 22}deg` } as React.CSSProperties)
    : undefined;
  return (
    <span
      className={`lift${p ? ' on' : ''}${pressed ? ' pressed' : ''}`}
      style={style}
      onPointerMove={move}
      onPointerEnter={move}
      onPointerLeave={() => { setP(null); setPressed(false); }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      <StickerArt id={id} size={128} tilt={tiltFor(id)} shine={p} />
    </span>
  );
}
