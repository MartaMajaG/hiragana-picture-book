import type { Draw } from './types';
import a from './a';
import i from './i';
import u from './u';
import e from './e';
import o from './o';
import ka from './ka';
import ki from './ki';
import ku from './ku';
import ke from './ke';
import ko from './ko';

// Keyed by romaji. Add a new file and register it here to give a kana its picture.
export const illustrations: Record<string, Draw> = { a, i, u, e, o, ka, ki, ku, ke, ko };
