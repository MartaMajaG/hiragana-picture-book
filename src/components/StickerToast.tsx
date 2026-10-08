import { useEffect } from 'react';
import StickerArt from './StickerArt';
import { STICKERS } from '../data/stickers';

/** Announces a newly earned sticker: it peels onto a paper card in the corner, then tucks itself away. */
export default function StickerToast({ id, onOpen, onDone }: { id: string; onOpen: () => void; onDone: () => void }) {
  const s = STICKERS.find((x) => x.id === id);
  useEffect(() => {
    const t = window.setTimeout(onDone, 6000);
    return () => clearTimeout(t);
  }, [id, onDone]);
  if (!s) return null;
  return (
    <div className="sticker-toast" role="status" key={id}>
      <button type="button" className="st-body" onClick={onOpen}>
        <span className="st-art">
          <StickerArt id={s.id} size={72} tilt={-6} />
        </span>
        <span className="st-text">
          <small>New sticker!</small>
          <b>
            <span lang="ja">{s.jp}</span> {s.name}
          </b>
          <span>See it in your album →</span>
        </span>
      </button>
      <button type="button" className="st-close" onClick={onDone} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
