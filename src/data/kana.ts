import strokeData from './strokes.json';

export interface Kana {
  kana: string;
  romaji: string;
  /** Hue (0-360) used for the character's background glow and accents. */
  hue: number;
  /** The gojuon row it belongs to, e.g. "か". */
  row: string;
  /** Short name of the picture mnemonic. */
  title: string;
  sounds: string;
  story: string;
  word: { kana: string; reading: string };
}

/** Stroke paths from KanjiVG (CC BY-SA 3.0), in writing order, in a 109 x 109 box. */
export const STROKES: Record<string, string[]> = strokeData;

/** Characters that have a lesson. Add new ones here in chart order. */
export const KANA: Kana[] = [
  { kana: "あ", romaji: "a", hue: 352, row: "あ", title: "Candy apple", sounds: "a in \"father\"", 
    story: "The loop is a glossy candy apple from a summer festival stall. The long line is the stick poking out of the top, and the short line across is the ribbon tied around it. Ah, an apple.", 
    word: { kana: "りんごあめ", reading: "ringo ame · candy apple" } },
  { kana: "い", romaji: "i", hue: 84, row: "あ", title: "Two eels", sounds: "ee in \"eel\"", 
    story: "Two eels swim side by side through the reeds. The one on the left flicks its tail up at the end. Say \"ee\" for eel.", 
    word: { kana: "いぬ", reading: "inu · dog" } },
  { kana: "う", romaji: "u", hue: 200, row: "あ", title: "A wave at sea", sounds: "oo in \"ooh\"", 
    story: "The long curve is a wave rolling in, and the small stroke above is a drop of spray. Ooh, a big wave. The word for sea, umi, starts with it.", 
    word: { kana: "うみ", reading: "umi · sea" } },
  { kana: "え", romaji: "e", hue: 330, row: "あ", title: "A plum branch", sounds: "e in \"egg\"", 
    story: "The zigzag is a plum branch in bloom, and the short stroke on top is a small bird flying over it. え is the start of eda, branch.", 
    word: { kana: "えだ", reading: "eda · branch" } },
  { kana: "お", romaji: "o", hue: 8, row: "あ", title: "An octopus", sounds: "o in \"orange\"", 
    story: "The big loop is an octopus with a round head, the cross is a strand of seaweed, and the dot is a bubble. O for octopus.", 
    word: { kana: "おちゃ", reading: "ocha · green tea" } },
  { kana: "か", romaji: "ka", hue: 190, row: "か", title: "A mosquito", sounds: "ca in \"car\"", 
    story: "か is the actual Japanese word for mosquito. The big curve is its wing, the slash is its body, and the little stroke on the right is the buzz.", 
    word: { kana: "かさ", reading: "kasa · umbrella" } },
  { kana: "き", romaji: "ki", hue: 42, row: "か", title: "A key", sounds: "key", 
    story: "Two teeth across the top, a long shaft, and a round bow at the bottom to hold it by. Ki sounds just like key.", 
    word: { kana: "き", reading: "ki · tree" } },
  { kana: "く", romaji: "ku", hue: 218, row: "か", title: "A singing cuckoo", sounds: "coo in \"cuckoo\"", 
    story: "The angle is a beak opened wide in the middle of a song: ku, ku! Picture a cuckoo calling from a branch.", 
    word: { kana: "くも", reading: "kumo · cloud" } },
  { kana: "け", romaji: "ke", hue: 152, row: "か", title: "Kelp and a fish", sounds: "ke in \"kelp\"", 
    story: "Two strands of kelp sway on the seabed and a small fish swims across between them. Ke for kelp.", 
    word: { kana: "けむり", reading: "kemuri · smoke" } },
  { kana: "こ", romaji: "ko", hue: 22, row: "か", title: "Two koi", sounds: "co in \"coat\"", 
    story: "Two koi circle each other in a pond, one near the top and one near the bottom. こ as in koi.", 
    word: { kana: "こい", reading: "koi · carp" } },
];

/** The gojuon chart, one entry per consonant row: [kana, romaji] pairs for a, i, u, e, o. Empty strings are gaps. */
export const CHART: [string, string][][] = [
  [['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']],
  [['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']],
  [['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']],
  [['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']],
  [['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']],
  [['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']],
  [['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']],
  [['や','ya'],['',''],['ゆ','yu'],['',''],['よ','yo']],
  [['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']],
  [['わ','wa'],['',''],['',''],['',''],['を','wo']],
  [['ん','n'],['',''],['',''],['',''],['','']],
];

export const TOTAL_KANA = 46;
export const kanaIndex = (romaji: string) => KANA.findIndex((k) => k.romaji === romaji);
