import { useEffect, useRef, useState } from 'react';
import { DESKS, deskImage, loadDesk, saveDesk, type DeskId } from '../lib/desk';
import { arrowKeys } from '../lib/a11y';

/** Settings: the desk the book lies on, and the way into help for the page you're on. */
export default function SettingsSheet({ onHelp, onClose }: { onHelp: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [desk, setDesk] = useState<DeskId>(loadDesk);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const pick = (d: DeskId) => {
    setDesk(d);
    saveDesk(d);
  };
  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet settings-sheet" role="dialog" aria-modal="true" aria-labelledby="settings-title" tabIndex={-1} ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-h">
          <h2 id="settings-title">
            <span lang="ja">設定</span> Settings
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close settings">
            ×
          </button>
        </div>

        <h3 className="settings-h">Where the book lies</h3>
        <div className="desk-picks" role="radiogroup" aria-label="Background" onKeyDown={arrowKeys}>
          {DESKS.map((d) => (
            <button key={d.id} type="button" role="radio" aria-checked={desk === d.id} tabIndex={desk === d.id ? 0 : -1} className="desk-pick" onClick={() => pick(d.id)}>
              <span className="desk-swatch" aria-hidden="true" style={{ backgroundImage: deskImage(d) }}>
                <span className="mini-book" />
              </span>
              <span className="desk-name">
                <span lang="ja">{d.jp}</span> {d.name}
              </span>
              <span className="desk-note">{d.note}</span>
            </button>
          ))}
        </div>

        <h3 className="settings-h">Help</h3>
        <button type="button" className="btn ghost" onClick={onHelp}>
          How this page works →
        </button>
      </div>
    </div>
  );
}
