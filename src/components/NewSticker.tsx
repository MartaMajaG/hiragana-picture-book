import { useEffect, useRef } from 'react';
import StickerArt from './StickerArt';
import { STICKERS } from '../data/stickers';

/**
 * A newly earned sticker, just peeled off its backing paper. The learner can go and stick it into the album now
 * (which opens the album with the sticker ready to drag into place) or keep it for later.
 */
export default function NewSticker({ id, onStick, onLater }: { id: string; onStick: () => void; onLater: () => void }) {
  const s = STICKERS.find((x) => x.id === id);
  const stickRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    stickRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onLater();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [id, onLater]);
  if (!s) return null;
  return (
    <div className="scrim new-sticker-scrim">
      <div className="new-sticker" role="dialog" aria-modal="true" aria-labelledby="ns-title" key={id}>
        <div className="ns-backing" aria-hidden="true">
          <span className="ns-art">
            <StickerArt id={s.id} size={200} tilt={-6} shine={{ x: 0.3, y: 0.3 }} />
          </span>
        </div>
        <small className="ns-kicker">New sticker!</small>
        <h2 id="ns-title">
          <span lang="ja">{s.jp}</span> {s.name}
        </h2>
        <p className="ns-how">{s.how}</p>
        <div className="ns-actions">
          <button type="button" className="btn primary" ref={stickRef} onClick={onStick}>
            Stick it in my album →
          </button>
          <button type="button" className="btn ghost" onClick={onLater}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
