import { useId, useMemo } from 'react';
import { pastelize } from '../lib/illustration';
import { stickerArt } from '../stickers';

/**
 * A sticker as it sits in the album: die-cut white edge and a soft shadow (the #diecut filter in SvgDefs).
 * Pass `shine` (pointer position, 0..1) to sweep a glossy vinyl sheen across it, clipped to the sticker's own outline.
 */
export default function StickerArt({
  id,
  size = 96,
  tilt = 0,
  shine,
}: {
  id: string;
  size?: number;
  tilt?: number;
  shine?: { x: number; y: number } | null;
}) {
  const art = useMemo(() => pastelize(stickerArt(id)), [id]);
  const uid = useId().replace(/:/g, '');
  // the sheen is a soft diagonal band whose position follows the pointer
  const at = shine ? -60 + shine.x * 150 + shine.y * 40 : 0;
  return (
    <svg className="sticker-art" viewBox="-12 -12 124 124" width={size} height={size} style={{ rotate: `${tilt}deg` }} aria-hidden="true">
      <g filter="url(#diecut)" dangerouslySetInnerHTML={{ __html: art }} />
      {shine && (
        <>
          <defs>
            <linearGradient id={`sh${uid}`} gradientUnits="userSpaceOnUse" x1={at} y1={at - 20} x2={at + 70} y2={at + 50}>
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`mk${uid}`}>
              <g filter="url(#silhouette)" dangerouslySetInnerHTML={{ __html: art }} />
            </mask>
          </defs>
          <rect className="sheen" x="-12" y="-12" width="124" height="124" fill={`url(#sh${uid})`} mask={`url(#mk${uid})`} />
        </>
      )}
    </svg>
  );
}

/** A small, steady tilt per sticker, so the album looks hand-placed. */
export const tiltFor = (id: string) => ([...id].reduce((a, c) => a + c.charCodeAt(0), 0) % 11) - 5;
