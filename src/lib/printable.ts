import { pastelize } from './illustration';
import { stickerArt } from '../stickers';

/**
 * A sticker as a standalone, print-ready SVG: the artwork with its white die-cut border and a thin grey cut line
 * around it, at about 6 cm wide, so it can go straight to a sticker printer or a cutting machine.
 */
export function printableSvg(id: string): string {
  const art = pastelize(stickerArt(id));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 124 124" width="60mm" height="60mm">
<defs><filter id="cut" x="-25%" y="-25%" width="150%" height="150%">
<feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="line"/><feFlood flood-color="#9a9184"/><feComposite in2="line" operator="in" result="cutline"/>
<feMorphology in="SourceAlpha" operator="dilate" radius="3.8" result="edge"/><feFlood flood-color="#ffffff"/><feComposite in2="edge" operator="in" result="border"/>
<feMerge><feMergeNode in="cutline"/><feMergeNode in="border"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></defs>
<g filter="url(#cut)">${art}</g>
</svg>`;
}

export function downloadSticker(id: string) {
  const url = URL.createObjectURL(new Blob([printableSvg(id)], { type: 'image/svg+xml' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `kana-ehon-${id}.svg`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Print the sticker on its own page, through a hidden frame so no pop-up window is needed. */
export function printSticker(id: string, title: string) {
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;width:0;height:0;border:0;right:0;bottom:0';
  document.body.appendChild(frame);
  const doc = frame.contentDocument!;
  doc.open();
  doc.write(`<!doctype html><title>${title}</title><style>@page{margin:15mm}body{margin:0;display:grid;place-items:center;min-height:90vh}</style>${printableSvg(id)}`);
  doc.close();
  setTimeout(() => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 1000);
  }, 100);
}
