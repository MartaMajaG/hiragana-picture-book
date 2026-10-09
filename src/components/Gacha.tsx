import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import StickerArt, { tiltFor } from './StickerArt';
import Placement from './Placement';
import { CAPSULES, TRADE_VALUE, GACHA_COST, SERIES, balance, seriesDone, seriesOpen, seriesUnlocksNext, superMissing, type Capsule } from '../data/gacha';
import { CAPSULE, MACHINE } from '../gacha/machine';
import { pastelize } from '../lib/illustration';
import { prefersReducedMotion } from '../lib/motion';
import { downloadSticker, printSticker } from '../lib/printable';
import type { Progress } from '../lib/progress';

/**
 * idle → coin (a 文 drops into the slot) → turning (the handle ratchets round, the machine shakes, capsules tumble)
 * → dropped (a capsule rolls out of the chute and waits) → open (it pops apart in confetti) → placing (stick it in).
 */
type Phase = 'idle' | 'coin' | 'turning' | 'dropped' | 'open' | 'placing';
const RARITY_LABEL = { common: '', rare: '★ Rare', super: '★★ Super rare' } as const;
const COIN_MS = 700;
const TURN_MS = 1500;

interface Props {
  progress: Progress;
  onPull: (seriesId: string) => { capsule: Capsule; isNew: boolean } | null;
  onPlaced: (id: string) => void;
  /** Trade one spare copy of a capsule sticker back for mon. */
  onTrade: (id: string) => void;
}

/**
 * The gachapon page of the sticker book: a capsule machine on the left page, the capsule series on the right.
 * Pay 30 mon, turn the handle, tap the capsule to open it, then stick the sticker onto its glowing spot.
 */
export default function Gacha({ progress, onPull, onPlaced, onTrade }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<{ capsule: Capsule; isNew: boolean } | null>(null);
  const [placingId, setPlacingId] = useState<string | null>(null);
  /** The capsule sticker whose card is open. */
  const [detail, setDetail] = useState<string | null>(null);
  // open on the newest series that's unlocked and not yet complete
  const [si, setSi] = useState(() => {
    const open = SERIES.map((_, i) => i).filter((i) => seriesOpen(progress, i));
    return open.find((i) => !seriesUnlocksNext(progress, SERIES[i])) ?? open[open.length - 1];
  });
  const series = SERIES[si];
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (ms: number, f: () => void) => timers.current.push(window.setTimeout(f, prefersReducedMotion() ? 0 : ms));

  // each series has its own machine colour: swap the body reds
  const art = useMemo(() => {
    const [m, sh, d] = series.machine;
    const tint = (svg: string) => pastelize(svg.replace(/#D9473A/gi, m).replace(/#B0342C/gi, sh).replace(/#8E2A24/gi, d));
    return { back: tint(MACHINE.back), capsules: tint(MACHINE.capsules), front: tint(MACHINE.front), handle: tint(MACHINE.handle) };
  }, [series]);
  const [hx, hy] = MACHINE.handleCenter;
  const [cx, cy] = MACHINE.chuteExit;
  const money = balance(progress);
  const canPay = money >= GACHA_COST;

  // Until it's opened and stuck in, the collection doesn't give away what was in the capsule.
  const hidden = result && phase !== 'idle' ? result.capsule.id : null;
  const count = (id: string) => (progress.capsules[id] ?? 0) - (id === hidden && result?.isNew ? 1 : 0);
  const owned = series.capsules.filter((c) => count(c.id) > 0).length;
  const complete = phase === 'idle' && seriesDone(progress, series);
  // everything but the super rare: the next series is already open
  const nextOpen = phase === 'idle' && !complete && seriesUnlocksNext(progress, series);
  const nextSeries = SERIES[si + 1];

  const turn = () => {
    if (phase !== 'idle' || !canPay) return;
    const r = onPull(series.id);
    if (!r) return;
    setResult(r);
    setPhase('coin');
    later(COIN_MS, () => setPhase('turning'));
    later(COIN_MS + TURN_MS, () => setPhase('dropped'));
  };
  const open = () => phase === 'dropped' && setPhase('open');
  const afterReveal = () => {
    if (result?.isNew) {
      setPlacingId(result.capsule.id);
      setPhase('placing');
    } else {
      setPhase('idle');
    }
  };
  const stickLater = (id: string) => {
    setPlacingId(id);
    setPhase('placing');
  };

  const placing = placingId ? CAPSULES.find((c) => c.id === placingId) : null;

  return (
    <div className="spread gacha-spread">
      <div className="gacha-machine-page">
        <h2>
          <span lang="ja">ガチャ</span> Gachapon
        </h2>
        <div className="series-shelf" role="tablist" aria-label="Capsule series">
          {SERIES.map((x, i) => {
            const open = seriesOpen(progress, i);
            const done = seriesDone(progress, x);
            const hunting = superMissing(progress, i);
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={i === si}
                disabled={!open || phase !== 'idle'}
                className={`series-chip${done ? ' done' : ''}${open ? '' : ' locked'}${hunting ? ' hunting' : ''}`}
                style={{ ['--machine' as string]: x.machine[0] } as React.CSSProperties}
                onClick={() => setSi(i)}
                title={hunting ? `${x.name}: the super rare is still missing` : open ? x.name : `Collect all of ${SERIES[i - 1].name} except the super rare to unlock`}
              >
                <span className="dot" aria-hidden="true">{done ? '✓' : hunting ? '★' : open ? '' : '🔒'}</span>
                <span className="chip-text">
                  <span className="en">{x.name}</span>
                  <span className="jp" lang="ja">{x.jp}</span>
                </span>
                {hunting && <span className="sr-only">, super rare still missing</span>}
              </button>
            );
          })}
        </div>
        {(() => {
          const hunt = SERIES.map((x, i) => ({ x, i })).filter(({ i }) => superMissing(progress, i) && i !== si);
          return hunt.length > 0 && phase === 'idle' ? (
            <p className="hunt-note">
              <span className="hunt-star" aria-hidden="true">★★</span> Still hiding:{' '}
              {hunt.map(({ x, i }, j) => (
                <span key={x.id}>
                  {j > 0 && ', '}
                  <button type="button" className="hunt-link" onClick={() => setSi(i)}>
                    the super rare in {x.name}
                  </button>
                </span>
              ))}
            </p>
          ) : null;
        })()}
        <p className="gacha-intro">
          Spend your mon on a capsule. Each one holds a sticker from the <b>{series.name}</b> series.
        </p>
        <svg className={`machine ${phase}`} viewBox="0 0 200 320" role="img" aria-label="A gachapon capsule machine">
          <g className="machine-body">
            <g dangerouslySetInnerHTML={{ __html: art.back }} />
            <g className="machine-capsules" dangerouslySetInnerHTML={{ __html: art.capsules }} />
            <g dangerouslySetInnerHTML={{ __html: art.front }} />
            <g
              className="machine-handle"
              style={{ transformOrigin: `${hx}px ${hy}px`, transformBox: 'view-box' }}
              dangerouslySetInnerHTML={{ __html: art.handle }}
            />
          </g>
          {/* the coin, from below the machine into the slot */}
          {phase === 'coin' && (
            <g className="coin-in">
              <circle cx="130" cy="181" r="7" fill="#d9a85a" stroke="#9c7330" strokeWidth="1.6" />
              <rect x="128" y="179" width="4" height="4" fill="#efe5cb" />
            </g>
          )}
          {(phase === 'dropped' || phase === 'open') && result && (
            <g
              className="dropped-capsule"
              transform={`translate(${cx} ${cy})`}
              role="button"
              tabIndex={0}
              aria-label="Open the capsule"
              onClick={open}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
            >
              <g className="roll" dangerouslySetInnerHTML={{ __html: pastelize(CAPSULE(result.capsule.shell[0], result.capsule.shell[1])) }} />
            </g>
          )}
          {phase === 'dropped' && (
            <text className="tap-hint" x={cx} y={cy + 44} textAnchor="middle">
              tap to open
            </text>
          )}
        </svg>
        <div className="gacha-controls">
          {phase === 'dropped' ? (
            <button type="button" className="btn primary" onClick={open}>
              Open the capsule
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={turn} disabled={!canPay || phase !== 'idle'}>
              {phase === 'coin' || phase === 'turning' ? 'Gacha-gacha…' : `Turn the handle · ${GACHA_COST} mon`}
            </button>
          )}
          <p className="gacha-purse">
            <span className="coin-dot" lang="ja" aria-hidden="true">文</span>
            {canPay ? `You have ${money} mon to spend.` : `You have ${money} mon. ${GACHA_COST - money} more to turn the handle.`}
          </p>
          <p className="gacha-small">Got one already? Keep the spare, or trade it back for mon.</p>
        </div>
      </div>

      <div className="gacha-collection">
        <h2>
          <span lang="ja">{series.jp}</span> {series.name}
        </h2>
        <p className="gacha-intro">
          {owned} of {series.capsules.length} collected. Rare capsules turn up less often.
          {nextSeries && !complete && !nextOpen && ` Collect all but the super rare to unlock ${nextSeries.name}.`}
        </p>
        {nextOpen && (
          <div className="series-complete">
            <span className="seal" lang="ja" aria-hidden="true">開</span>
            <span>
              <b>Almost complete!</b> Only the super rare is still hiding in here.{' '}
              {nextSeries ? (
                <>
                  <span lang="ja">{nextSeries.jp}</span> {nextSeries.name} is open, and you can come back for it any time.
                </>
              ) : (
                'Keep turning the handle to find it.'
              )}
            </span>
            {nextSeries && (
              <button type="button" className="btn small" onClick={() => setSi(si + 1)}>
                Go to {nextSeries.name} →
              </button>
            )}
          </div>
        )}
        {complete && (
          <div className="series-complete">
            <span className="seal" lang="ja" aria-hidden="true">完</span>
            <span>
              <b>Series complete!</b>{' '}
              {nextSeries ? (
                <>
                  <span lang="ja">{nextSeries.jp}</span> {nextSeries.name} is now open.
                </>
              ) : (
                'You have collected every capsule. おめでとう!'
              )}
            </span>
            {nextSeries && (
              <button type="button" className="btn small" onClick={() => setSi(si + 1)}>
                Go to {nextSeries.name} →
              </button>
            )}
          </div>
        )}
        <div className="capsule-grid">
          {series.capsules.map((c) => {
            const n = count(c.id);
            const waiting = progress.capsuleToStick.includes(c.id) && n > 0;
            const isTarget = placingId === c.id;
            return (
              <div key={c.id} className={`capsule-slot ${c.rarity}${n && !waiting ? ' have' : ''}${waiting || isTarget ? ' pending' : ''}${isTarget ? ' target' : ''}`} data-capsule={c.id}>
                {n && !waiting && !isTarget ? (
                  <button type="button" className="capsule-open" onClick={() => setDetail(c.id)} aria-label={`About ${c.name}`}>
                    <StickerArt id={c.id} size={96} tilt={tiltFor(c.id)} />
                  </button>
                ) : (
                  <span className={`capsule-ghost${waiting || isTarget ? ' halo' : ''}`} aria-hidden="true">
                    {c.rarity === 'super' && !n && !isTarget ? '?' : <StickerArt id={c.id} size={80} />}
                  </span>
                )}
                <span className="slot-jp" lang="ja">{n || isTarget || c.rarity !== 'super' ? c.jp : '？'}</span>
                <span className="slot-name">
                  {n || isTarget || c.rarity !== 'super' ? c.name : 'Mystery capsule'}
                  {n > 1 && <span className="count"> ×{n}</span>}
                </span>
                {c.rarity !== 'common' && <span className="rarity">{RARITY_LABEL[c.rarity]}</span>}
                {waiting && !isTarget && phase === 'idle' && (
                  <button type="button" className="btn small stick-now" onClick={() => stickLater(c.id)}>
                    Stick it in
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {detail && createPortal(
        <CapsuleCard
          capsule={CAPSULES.find((c) => c.id === detail)!}
          count={count(detail)}
          onTrade={() => onTrade(detail)}
          onClose={() => setDetail(null)}
        />,
        document.body,
      )}
      {/* overlays render at the top of the page: the book's drop-shadow filter would otherwise trap fixed positioning */}
      {phase === 'open' && result && createPortal(
        <Reveal
          result={result}
          onDone={afterReveal}
          onTrade={() => {
            onTrade(result.capsule.id);
            setPhase('idle');
          }}
        />,
        document.body,
      )}
      {phase === 'placing' && placing && createPortal(
        <Placement
          id={placing.id}
          jp={placing.jp}
          name={placing.name}
          target={`[data-capsule="${placing.id}"] .capsule-ghost`}
          onCancel={() => {
            setPlacingId(null);
            setPhase('idle');
          }}
          onPlaced={(id) => {
            onPlaced(id);
            setPlacingId(null);
            setPhase('idle');
          }}
        />,
        document.body,
      )}
    </div>
  );
}

/** Paper confetti and sakura petals bursting out of the capsule. */
function Confetti({ gold }: { gold: boolean }) {
  const colours = gold ? ['#e3b04b', '#f2d27a', '#c79a4a', '#fff4d6'] : ['#e8a0a6', '#f2c84e', '#7cc6d6', '#9fbf8f', '#f7b8c6', '#c25a47'];
  const bits = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2 + (i % 3) * 0.2;
    const d = 90 + (i % 5) * 26;
    return {
      dx: Math.cos(a) * d,
      dy: Math.sin(a) * d - 40,
      r: (i * 47) % 360,
      c: colours[i % colours.length],
      petal: i % 3 === 0,
      delay: (i % 4) * 30,
    };
  });
  return (
    <span className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i
          key={i}
          className={b.petal ? 'petal' : ''}
          style={{ ['--dx' as string]: `${b.dx}px`, ['--dy' as string]: `${b.dy}px`, ['--r' as string]: `${b.r}deg`, background: b.c, animationDelay: `${b.delay}ms` } as React.CSSProperties}
        />
      ))}
    </span>
  );
}

/** The capsule pops open: the halves fly apart in a burst of confetti and the sticker rises out. */
function Reveal({ result, onDone, onTrade }: { result: { capsule: Capsule; isNew: boolean }; onDone: () => void; onTrade: () => void }) {
  const { capsule: c, isNew } = result;
  const okRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    okRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDone();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);
  return (
    <div className="scrim new-sticker-scrim">
      <div className="new-sticker capsule-reveal" role="dialog" aria-modal="true" aria-labelledby="cr-title">
        <div className="cr-stage" aria-hidden="true">
          <Confetti gold={c.rarity === 'super'} />
          <svg className="cr-half top" viewBox="-30 -30 60 60" width="120" height="120">
            <path d="M-26,0 A26,26 0 0 1 26,0Z" fill={c.shell[0]} />
            <path d="M-18,-12 A20,20 0 0 1 -4,-21" fill="none" stroke="#fff4ee" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <svg className="cr-half bottom" viewBox="-30 -30 60 60" width="120" height="120">
            <path d="M-26,0 A26,26 0 0 0 26,0Z" fill={c.shell[1]} stroke="#d8cbb2" strokeWidth="1" />
          </svg>
          <span className={`cr-art ${c.rarity}`}>
            <StickerArt id={c.id} size={170} tilt={-5} shine={{ x: 0.35, y: 0.3 }} />
          </span>
        </div>
        <small className="ns-kicker">{isNew ? 'New capsule sticker!' : 'A spare! You have this one already'}</small>
        <h2 id="cr-title">
          <span lang="ja">{c.jp}</span> {c.name}
        </h2>
        {c.rarity !== 'common' && <p className={`cr-rarity ${c.rarity}`}>{RARITY_LABEL[c.rarity]}</p>}
        <p className="ns-how">{c.note}</p>
        <div className="ns-actions">
          {isNew ? (
            <button type="button" className="btn primary" ref={okRef} onClick={onDone}>
              Stick it in →
            </button>
          ) : (
            <>
              <button type="button" className="btn primary" ref={okRef} onClick={onTrade}>
                Trade it in · +{TRADE_VALUE[c.rarity]} mon
              </button>
              <button type="button" className="btn ghost" onClick={onDone}>
                Keep the spare
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * A capsule sticker's card: what it is and the story behind it. Spares can be traded back for mon, and owning a spare
 * unlocks the print-ready sticker (download as SVG or print), so keeping one is worth something too.
 */
function CapsuleCard({ capsule: c, count, onTrade, onClose }: { capsule: Capsule; count: number; onTrade: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const spares = count - 1;
  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet capsule-card" role="dialog" aria-modal="true" aria-labelledby="cc-title" tabIndex={-1} ref={ref} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn cc-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="cc-art" aria-hidden="true">
          <StickerArt id={c.id} size={180} tilt={-4} shine={{ x: 0.35, y: 0.3 }} />
        </div>
        <h2 id="cc-title">
          <span lang="ja">{c.jp}</span> {c.name}
        </h2>
        <p className="cc-reading">
          <i>{c.reading}</i>
          {c.rarity !== 'common' && <span className={`cr-rarity ${c.rarity}`}> · {RARITY_LABEL[c.rarity]}</span>}
          {' · '}
          {spares > 0 ? `you have ${count} (${spares} ${spares === 1 ? 'spare' : 'spares'})` : 'you have 1, stuck in the book'}
        </p>
        <p className="cc-note">{c.note}</p>
        {spares > 0 ? (
          <div className="cc-actions">
            <p className="cc-hint">A spare is yours to print: a real sticker with a cut line, about 6 cm across.</p>
            <button type="button" className="btn primary" onClick={() => downloadSticker(c.id)}>
              Download SVG
            </button>
            <button type="button" className="btn ghost" onClick={() => printSticker(c.id, c.name)}>
              Print it
            </button>
            <button type="button" className="btn ghost" onClick={onTrade}>
              Trade a spare · +{TRADE_VALUE[c.rarity]} mon
            </button>
          </div>
        ) : (
          <p className="cc-hint">Get a spare from the machine to unlock the print-ready sticker, or trade it for mon.</p>
        )}
      </div>
    </div>
  );
}
