# Notes for Claude

A hiragana learning app (Vite + React + TypeScript, no other runtime dependencies). See README.md for structure.

## Product

- Two areas in the app bar: **Lessons** (one character at a time, with a Learn / Practice toggle) and **Review** (all characters shuffled). Keep them separate.
- Practice is always about the character currently open: trace with a guide, then write from memory, then the picture appears.
- Help lives behind the "?" button. The only proactive tip is the one-time coach mark on the practice pad.
- It is a portfolio playground piece, so visual quality matters as much as function.

## Illustrations

- One file per character in `src/illustrations/`, drawn in KanjiVG's 109 × 109 space so shapes line up with strokes.
- Style direction so far: crisp flat vector shapes, a small palette per picture, one shade shape and one or two highlights. No grain filters, sparkles, glow blobs or decorative extras that don't serve the mnemonic (for example, no ribbon on the candy apple).
- The owner art-directs these. Change one illustration at a time and show it before moving on.

## Conventions

- Stroke data comes from KanjiVG (CC BY-SA 3.0); keep the footer credit.
- Colours go through the CSS tokens in `src/styles.css`; each character's hue is only used for its background glow and hints.
- Check changes with `npm run build` (typecheck + build) before calling them done.
