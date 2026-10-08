import { useEffect, useRef } from 'react';
import { MON } from '../lib/progress';
import { STICKERS } from '../data/stickers';
import type { Progress } from '../lib/progress';

/** One copper mon coin, face on: a square hole and the four characters of a Kan'ei Tsūhō (寛永通寳). */
function Coin({ size = 46, tilt = 0 }: { size?: number; tilt?: number }) {
  return (
    <svg className="coin-face" viewBox="0 0 100 100" width={size} height={size} style={{ rotate: `${tilt}deg` }} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="#b8844e" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#8e5f32" strokeWidth="5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#d6a56c" strokeWidth="1.5" opacity="0.7" />
      <rect x="37" y="37" width="26" height="26" fill="#efe5cb" stroke="#8e5f32" strokeWidth="4" />
      <g fill="#5e3c1c" fontFamily="'Shippori Mincho', serif" fontWeight="800" fontSize="19" textAnchor="middle">
        <text x="50" y="30">寛</text>
        <text x="50" y="86">永</text>
        <text x="80" y="57">通</text>
        <text x="20" y="57">寳</text>
      </g>
      <path d="M18,34 C22,24 30,16 40,12" fill="none" stroke="#f3cf9c" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** A sashi: coins threaded edge-on on a red cord, a string of 100 mon. */
function Sashi() {
  return (
    <svg className="sashi" viewBox="0 0 40 150" width="34" height="128" aria-hidden="true">
      <path d="M20,4 C14,10 14,16 20,20" fill="none" stroke="#b5463a" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="14" x2="20" y2="140" stroke="#b5463a" strokeWidth="2.4" />
      {Array.from({ length: 24 }, (_, i) => (
        <g key={i}>
          <ellipse cx="20" cy={24 + i * 4.8} rx="15" ry="3.2" fill={i % 2 ? '#a9763f' : '#b8844e'} />
          <ellipse cx="20" cy={23.2 + i * 4.8} rx="15" ry="1.4" fill="#d6a56c" opacity="0.55" />
        </g>
      ))}
      <path d="M20,138 l-6,10 M20,138 l0,11 M20,138 l6,10" stroke="#b5463a" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const EARN: [string, number][] = [
  ['Open a lesson for the first time', MON.open],
  ['Write a character from memory (first time)', MON.write],
  ['Write it again later', MON.rewrite],
  ['…with no slips, extra', MON.perfect],
  ['Right answer in review', MON.right],
  ['…5 or more right in a row, extra', MON.runBonus5],
  ['…10 or more right in a row, extra', MON.runBonus10],
  ['First practice of the day', MON.newDay],
];

/** The purse: your mon shown as real Edo-period coins, strings of 100 and loose change. */
export default function CoinPurse({ progress, onClose }: { progress: Progress; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const mon = progress.mon;
  const strings = Math.floor(mon / 100);
  const loose = mon % 100;
  const shownStrings = Math.min(strings, 10);
  const shownLoose = Math.min(loose, 24);
  // the next treasure sticker still to earn
  const next = STICKERS.filter((s) => !progress.stickers[s.id] && ['koban', 'tai', 'senryo', 'takarabune'].includes(s.id))
    .map((s) => ({ s, need: s.goal(progress)[1] }))
    .sort((a, b) => a.need - b.need)[0];

  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet purse-sheet" role="dialog" aria-modal="true" aria-labelledby="purse-title" tabIndex={-1} ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-h">
          <h2 id="purse-title">
            <span lang="ja">財布</span> Your purse
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close purse">
            ×
          </button>
        </div>

        <p className="purse-total">
          <b>{mon}</b> mon
          {strings > 0 && (
            <span>
              {' '}
              · {strings} {strings === 1 ? 'string' : 'strings'} of 100{loose ? ` and ${loose} loose` : ''}
            </span>
          )}
        </p>

        <div className="coins" aria-label={`${mon} mon`}>
          {mon === 0 && <p className="coins-empty">Your purse is empty. Open a lesson to earn your first mon.</p>}
          {Array.from({ length: shownStrings }, (_, i) => (
            <span key={`s${i}`} className="sashi-wrap" style={{ rotate: `${(i % 3) - 1}deg` }}>
              <Sashi />
              <small>100</small>
            </span>
          ))}
          {strings > shownStrings && <span className="more">+{strings - shownStrings} strings</span>}
          <span className="loose">
            {Array.from({ length: shownLoose }, (_, i) => (
              <Coin key={i} size={42} tilt={(i * 37) % 90} />
            ))}
            {loose > shownLoose && <span className="more">+{loose - shownLoose}</span>}
          </span>
        </div>

        <p className="purse-note">
          Mon (文) were the copper coins of Edo Japan, like this <span lang="ja">寛永通寳</span> Kan&apos;ei Tsūhō, minted for over
          two hundred years. The square hole let people thread them on a cord. A string of 96 coins was accepted as 100: the
          missing four paid whoever strung them.
        </p>

        <h3>How to earn mon</h3>
        <ul className="earn-list">
          {EARN.map(([what, n]) => (
            <li key={what}>
              <span>{what}</span>
              <b>+{n}</b>
            </li>
          ))}
        </ul>
        {next && (
          <p className="purse-next">
            Next treasure: <b lang="ja">{next.s.jp}</b> {next.s.name} at {next.need} mon, {Math.max(0, next.need - mon)} to go.
          </p>
        )}
      </div>
    </div>
  );
}
