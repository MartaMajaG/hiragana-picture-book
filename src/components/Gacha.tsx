import { useEffect, useMemo, useRef, useState } from 'react';
import StickerArt, { tiltFor } from './StickerArt';
import { CAPSULES, DUPLICATE_REFUND, GACHA_COST, balance, type Capsule } from '../data/gacha';
import { CAPSULE, MACHINE } from '../gacha/machine';
import { pastelize } from '../lib/illustration';
import type { Progress } from '../lib/progress';

type Phase = 'idle' | 'turning' | 'dropped' | 'open';
const RARITY_LABEL = { common: '', rare: '★ Rare', super: '★★ Super rare' } as const;

/**
 * The gachapon page of the sticker book: a capsule machine on the left page, the capsule series on the right.
 * Pay 30 mon, turn the handle, a capsule drops into the chute; tap it to open and see which sticker is inside.
 */
export default function Gacha({ progress, onPull }: { progress: Progress; onPull: () => { capsule: Capsule; isNew: boolean } | null }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<{ capsule: Capsule; isNew: boolean } | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const art = useMemo(() => ({
    back: pastelize(MACHINE.back), capsules: pastelize(MACHINE.capsules), front: pastelize(MACHINE.front), handle: pastelize(MACHINE.handle),
  }), []);
  const [hx, hy] = MACHINE.handleCenter;
  const [cx, cy] = MACHINE.chuteExit;
  const money = balance(progress);
  const canPay = money >= GACHA_COST;
  // until the capsule is opened, don't let the collection give away what's inside
  const hidden = result && (phase === 'turning' || phase === 'dropped') ? result.capsule.id : null;
  const count = (id: string) => (progress.capsules[id] ?? 0) - (id === hidden ? 1 : 0);
  const owned = CAPSULES.filter((c) => count(c.id) > 0).length;

  const turn = () => {
    if (phase !== 'idle' || !canPay) return;
    const r = onPull();
    if (!r) return;
    setResult(r);
    setPhase('turning');
    setAngle((a) => a + 360);
    timers.current.push(window.setTimeout(() => setPhase('dropped'), 950));
  };

  return (
    <div className="spread gacha-spread">
      <div className="gacha-machine-page">
        <h2>
          <span lang="ja">ガチャ</span> Gachapon
        </h2>
        <p className="gacha-intro">Spend your mon on a capsule. Each one holds a sticker from the sweets and snacks series.</p>
        <svg className={`machine ${phase}`} viewBox="0 0 200 300" role="img" aria-label="A gachapon capsule machine">
          <g dangerouslySetInnerHTML={{ __html: art.back }} />
          <g className="machine-capsules" dangerouslySetInnerHTML={{ __html: art.capsules }} />
          <g dangerouslySetInnerHTML={{ __html: art.front }} />
          <g
            className="machine-handle"
            style={{ transformOrigin: `${hx}px ${hy}px`, transformBox: 'view-box', transform: `rotate(${angle}deg)` }}
            dangerouslySetInnerHTML={{ __html: art.handle }}
          />
          {(phase === 'dropped' || phase === 'open') && result && (
            <g
              className="dropped-capsule"
              transform={`translate(${cx} ${cy})`}
              role="button"
              tabIndex={0}
              aria-label="Open the capsule"
              onClick={() => setPhase('open')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPhase('open')}
            >
              <g className="bounce" dangerouslySetInnerHTML={{ __html: pastelize(CAPSULE(result.capsule.shell[0], result.capsule.shell[1])) }} />
            </g>
          )}
        </svg>
        <div className="gacha-controls">
          {phase === 'dropped' ? (
            <button type="button" className="btn primary" onClick={() => setPhase('open')}>
              Open the capsule
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={turn} disabled={!canPay || phase !== 'idle'}>
              Turn the handle · {GACHA_COST} mon
            </button>
          )}
          <p className="gacha-purse">
            <span className="coin-dot" lang="ja" aria-hidden="true">文</span>
            {canPay ? `You have ${money} mon to spend.` : `You have ${money} mon. ${GACHA_COST - money} more to turn the handle.`}
          </p>
          <p className="gacha-small">Got one already? You get {DUPLICATE_REFUND} mon back.</p>
        </div>
      </div>

      <div className="gacha-collection">
        <h2>
          <span lang="ja">お菓子</span> Sweets &amp; snacks
        </h2>
        <p className="gacha-intro">
          {owned} of {CAPSULES.length} collected. Rare capsules turn up less often.
        </p>
        <div className="capsule-grid">
          {CAPSULES.map((c) => {
            const n = count(c.id);
            return (
              <div key={c.id} className={`capsule-slot ${c.rarity}${n ? ' have' : ''}`}>
                {n ? (
                  <StickerArt id={c.id} size={96} tilt={tiltFor(c.id)} />
                ) : (
                  <span className="capsule-ghost" aria-hidden="true">
                    {c.rarity === 'super' ? '?' : <StickerArt id={c.id} size={80} />}
                  </span>
                )}
                <span className="slot-jp" lang="ja">{n || c.rarity !== 'super' ? c.jp : '？'}</span>
                <span className="slot-name">
                  {n || c.rarity !== 'super' ? c.name : 'Super rare'}
                  {n > 1 && <span className="count"> ×{n}</span>}
                </span>
                {c.rarity !== 'common' && <span className="rarity">{RARITY_LABEL[c.rarity]}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {phase === 'open' && result && <Reveal result={result} onDone={() => setPhase('idle')} />}
    </div>
  );
}

/** The capsule pops open: the halves fly apart and the sticker inside comes up. */
function Reveal({ result, onDone }: { result: { capsule: Capsule; isNew: boolean }; onDone: () => void }) {
  const { capsule: c, isNew } = result;
  const okRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    okRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onDone();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);
  return (
    <div className="scrim new-sticker-scrim" onClick={onDone}>
      <div className="new-sticker capsule-reveal" role="dialog" aria-modal="true" aria-labelledby="cr-title" onClick={(e) => e.stopPropagation()}>
        <div className="cr-stage" aria-hidden="true">
          <svg className="cr-half top" viewBox="-30 -30 60 60" width="120" height="120">
            <path d="M-26,0 A26,26 0 0 1 26,0Z" fill={c.shell[0]} />
          </svg>
          <svg className="cr-half bottom" viewBox="-30 -30 60 60" width="120" height="120">
            <path d="M-26,0 A26,26 0 0 0 26,0Z" fill={c.shell[1]} stroke="#d8cbb2" strokeWidth="1" />
          </svg>
          <span className={`cr-art ${c.rarity}`}>
            <StickerArt id={c.id} size={170} tilt={-5} shine={{ x: 0.35, y: 0.3 }} />
          </span>
        </div>
        <small className="ns-kicker">{isNew ? 'New capsule sticker!' : `Duplicate · ${DUPLICATE_REFUND} mon back`}</small>
        <h2 id="cr-title">
          <span lang="ja">{c.jp}</span> {c.name}
        </h2>
        {c.rarity !== 'common' && <p className={`cr-rarity ${c.rarity}`}>{RARITY_LABEL[c.rarity]}</p>}
        <p className="ns-how">{c.note}</p>
        <div className="ns-actions">
          <button type="button" className="btn primary" ref={okRef} onClick={onDone}>
            Lovely
          </button>
        </div>
      </div>
    </div>
  );
}
