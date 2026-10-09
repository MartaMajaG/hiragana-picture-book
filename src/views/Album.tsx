import { useEffect, useRef, useState } from 'react';
import StickerArt, { tiltFor } from '../components/StickerArt';
import { STICKER_GROUPS, STICKERS, type Sticker, type StickerGroup } from '../data/stickers';
import { currentStreak, type Progress } from '../lib/progress';
import { KANA } from '../data/kana';
import Gacha from '../components/Gacha';
import Placement from '../components/Placement';
import { arrowKeys } from '../lib/a11y';
import type { Capsule } from '../data/gacha';

interface AlbumProps {
  progress: Progress;
  onOpenPurse: () => void;
  /** The sticker being stuck in right now, if any. */
  placing: string | null;
  onPlace: (id: string | null) => void;
  onPlaced: (id: string) => void;
  onPull: (seriesId: string) => { capsule: Capsule; isNew: boolean } | null;
  onCapsulePlaced: (id: string) => void;
  onTrade: (id: string) => void;
  /** Which page of the sticker book is open: the album or the gachapon. */
  tab: 'album' | 'gacha';
  onTab: (t: 'album' | 'gacha') => void;
}

/** The sticker album: two pages of slots, filled in by hand as stickers are earned. */
export default function Album({ progress, onOpenPurse, placing, onPlace, onPlaced, onPull, onCapsulePlaced, onTrade, tab, onTab: setTab }: AlbumProps) {
  useEffect(() => {
    if (placing) setTab('album');
  }, [placing]);
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
        <section className="next-up-sec" aria-labelledby="next-up-h">
          <h2 id="next-up-h" className="next-up-h">
            Almost there <span>· the stickers you’re closest to earning</span>
          </h2>
          <ul className="next-up">
            {next.map(({ s, g }) => {
              const have = Math.min(g[0], g[1]);
              return (
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
                    <span className="nu-count">
                      <b>{have}</b> of {g[1]} · {g[1] - have} to go
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="book">
        {/* index tabs: the album itself, and the gachapon machine */}
        <div className="book-tabs" role="tablist" aria-label="Sticker book" onKeyDown={arrowKeys}>
          <button type="button" role="tab" className="tab learn" aria-selected={tab === 'album'} tabIndex={tab === 'album' ? 0 : -1} onClick={() => setTab('album')}>
            <span lang="ja">帖</span>Album
          </button>
          <button type="button" role="tab" className="tab practice" aria-selected={tab === 'gacha'} tabIndex={tab === 'gacha' ? 0 : -1} onClick={() => setTab('gacha')}>
            <span lang="ja">ガチャ</span>Gachapon
          </button>
        </div>
        {tab === 'gacha' ? (
          <Gacha progress={progress} onPull={onPull} onPlaced={onCapsulePlaced} onTrade={onTrade} />
        ) : (
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
        )}
      </div>
      {placing && (() => {
        const st = STICKERS.find((x) => x.id === placing);
        return st ? (
          <Placement id={st.id} jp={st.jp} name={st.name} target={`[data-slot="${st.id}"] .ghost`} onCancel={() => onPlace(null)} onPlaced={onPlaced} />
        ) : null;
      })()}
    </section>
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
