import { useState } from 'react';
import StickerArt, { tiltFor } from '../components/StickerArt';
import { STICKER_GROUPS, STICKERS, type Sticker, type StickerGroup } from '../data/stickers';
import { currentStreak, type Progress } from '../lib/progress';
import { KANA } from '../data/kana';

/** The sticker album: two pages of slots, filled in as stickers are earned. */
export default function Album({ progress }: { progress: Progress }) {
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
        <dl className="purse-stats">
          <div>
            <dt>Mon</dt>
            <dd>
              <span lang="ja">文</span> {progress.mon}
            </dd>
          </div>
          <div>
            <dt>Day streak</dt>
            <dd>
              {streak} <span lang="ja">日</span>
            </dd>
          </div>
          <div>
            <dt>Best run</dt>
            <dd>{progress.bestRun}</dd>
          </div>
          <div>
            <dt>Written</dt>
            <dd>
              {progress.written.length}/{KANA.length}
            </dd>
          </div>
        </dl>
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
                <Group key={g.title} group={g} progress={progress} />
              ))}
            </div>
          ))}
          <span className="folio l" lang="ja" aria-hidden="true">
            帖
          </span>
        </div>
      </div>
    </section>
  );
}

function Group({ group, progress }: { group: StickerGroup; progress: Progress }) {
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
          <Slot key={s.id} sticker={s} progress={progress} />
        ))}
      </div>
    </section>
  );
}

function Slot({ sticker: s, progress }: { sticker: Sticker; progress: Progress }) {
  const when = progress.stickers[s.id];
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
