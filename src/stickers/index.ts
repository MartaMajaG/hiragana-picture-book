// Sticker artwork, one file per sticker in ./art, keyed by sticker id.
const art = import.meta.glob<string>('./art/*.ts', { eager: true, import: 'default' });

export const stickerArt = (id: string) => art[`./art/${id}.ts`] ?? '';
