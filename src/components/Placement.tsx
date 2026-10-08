import { useEffect, useRef, useState } from 'react';
import StickerArt from './StickerArt';

/**
 * Sticking a sticker in by hand: it waits on its backing paper at the bottom of the screen; drag it onto the glowing
 * spot in the album and let go. Close enough and it snaps in and presses flat; otherwise it springs back.
 * A button does the same for keyboard and screen-reader users.
 */
export default function Placement({
  id,
  jp,
  name,
  target: selector,
  onCancel,
  onPlaced,
}: {
  id: string;
  jp: string;
  name: string;
  /** CSS selector for the glowing spot the sticker belongs in. */
  target: string;
  onCancel: () => void;
  onPlaced: (id: string) => void;
}) {
  const home = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [snap, setSnap] = useState<{ x: number; y: number } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const target = () => document.querySelector<HTMLElement>(selector);
  // bring the waiting spot into view
  useEffect(() => {
    target()?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selector]);

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
  const offset = snap ?? drag;
  return (
    <div className="placement" role="region" aria-label={`Stick ${name} in`}>
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
          <StickerArt id={id} size={120} shine={drag ? { x: 0.4, y: 0.3 } : null} />
        </div>
        <div className="placement-text">
          <b>
            <span lang="ja">{jp}</span> {name}
          </b>
          <span>Drag the sticker onto its glowing spot.</span>
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

