// The gachapon machine for the mon (文) shop: a chunky red capsule-toy machine with a glass dome,
// drawn as separate layers in a 200 × 300 box so the app can animate the capsules and turn the handle.
// Full-strength colours: run the markup through `pastelize` like the illustrations.

const RED = '#D9473A', RED_SHADE = '#B0342C', RED_DEEP = '#8E2A24';
const CREAM = '#F7EBD3', CREAM_SHADE = '#E3CFAE';
const GLASS = '#BFD9E4', GLASS_EDGE = '#94B6C6';
const INK = '#2E2A22', GOLD = '#F2C14E', GOLD_SHADE = '#D19A2A';
const SILVER = '#E4E6EA', SILVER_SHADE = '#B9BEC7';
const HI = '#FFF4EE';

/** A single capsule, ~36px wide, centred on 0,0. */
export const CAPSULE = (top: string, bottom: string) =>
  `<path d="M-18,0 A18,18 0 0 1 18,0Z" fill="${top}"/>` +
  `<path d="M-18,0 A18,18 0 0 0 18,0Z" fill="${bottom}"/>` +
  // shade on the lower right
  `<path d="M12.7,-12.7 A18,18 0 0 1 -6,17 C8,13 15,2 12.7,-12.7Z" fill="${INK}" fill-opacity=".13"/>` +
  // seam: a slightly raised band where the halves meet
  `<rect x="-18" y="-1.6" width="36" height="3.2" rx="1.6" fill="${INK}" fill-opacity=".16"/>` +
  `<path d="M-17.6,-1.1 L17.6,-1.1" stroke="${HI}" stroke-width=".9" stroke-opacity=".7"/>` +
  // highlight on the upper left
  `<path d="M-12.5,-6 A13,13 0 0 1 -4,-12.6" fill="none" stroke="${HI}" stroke-width="2.2" stroke-linecap="round"/>` +
  `<path d="M-13.3,-0.6 L-13.3,-1.2" stroke="${HI}" stroke-width="2.2" stroke-linecap="round"/>`;

const DOME_CX = 100, DOME_CY = 94, DOME_R = 68;

// [x, y, rotation, top colour, bottom colour], back row first
const PILE: [number, number, number, string, string][] = [
  [100, 67, 24, '#5BAE6A', '#F7F4EE'],
  [64, 87, -18, '#4A86C5', '#F7F4EE'],
  [90, 85, 12, '#F2C14E', '#F7F4EE'],
  [116, 87, -26, '#E87FA0', '#F7F4EE'],
  [141, 91, 30, '#E8913A', '#F7F4EE'],
  [50, 110, 14, '#5BAE6A', '#F7F4EE'],
  [76, 108, -30, '#D9473A', '#F7F4EE'],
  [102, 108, 22, '#4A86C5', '#F7F4EE'],
  [128, 110, -10, '#F2C14E', '#F7F4EE'],
  [151, 115, 34, '#E87FA0', '#F7F4EE'],
  [61, 132, -8, '#E87FA0', '#F7F4EE'],
  [87, 131, 18, '#5BAE6A', '#F7F4EE'],
  [113, 131, -16, '#D9473A', '#F7F4EE'],
  [139, 133, 28, '#4A86C5', '#F7F4EE'],
];

const capsules = PILE.map(
  ([x, y, r, t, b]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(.76)">${CAPSULE(t, b)}</g>`,
).join('');

const back =
  // ground shadow
  `<ellipse cx="100" cy="292" rx="74" ry="6" fill="${INK}" fill-opacity=".12"/>` +
  // inside of the glass dome
  `<circle cx="${DOME_CX}" cy="${DOME_CY}" r="${DOME_R}" fill="${GLASS}"/>` +
  `<path d="M150,48 A68,68 0 0 1 152,140 L120,140 C150,118 158,80 150,48Z" fill="${GLASS_EDGE}" fill-opacity=".45"/>`;

const front =
  // glass: rim and reflections over the capsules
  `<circle cx="${DOME_CX}" cy="${DOME_CY}" r="${DOME_R - 1.5}" fill="none" stroke="${GLASS_EDGE}" stroke-width="3"/>` +
  `<path d="M46,70 C52,50 66,36 84,30" fill="none" stroke="${HI}" stroke-width="5" stroke-linecap="round" stroke-opacity=".9"/>` +
  `<path d="M42,86 L42.5,81" fill="none" stroke="${HI}" stroke-width="5" stroke-linecap="round" stroke-opacity=".9"/>` +
  `<path d="M150,108 C147,118 141,126 134,131" fill="none" stroke="${HI}" stroke-width="2" stroke-linecap="round" stroke-opacity=".7"/>` +
  // top cap with a knob and a little indigo noren
  `<circle cx="100" cy="17" r="6" fill="${RED}"/><path d="M103,12 A6,6 0 0 1 100,23 C104,21 105,16 103,12Z" fill="${RED_SHADE}"/>` +
  `<path d="M74,32 C76,22 86,19 100,19 C114,19 124,22 126,32Z" fill="${RED}"/>` +
  `<path d="M116,21 C122,23 125,27 126,32 L112,32 C116,29 117,25 116,21Z" fill="${RED_SHADE}"/>` +
  `<rect x="72" y="30" width="56" height="5" rx="2.5" fill="${RED_DEEP}"/>` +
  `<path d="M82,35 L118,35 L118,53 L107,53 L107,47 L93,47 L93,53 L82,53Z" fill="#3E5C8A"/>` +
  `<path d="M93,35 L93,53 M107,35 L107,53" stroke="#2F4A72" stroke-width="1"/>` +
  `<text x="100" y="45.4" text-anchor="middle" font-family="'Hiragino Mincho ProN','Yu Mincho',serif" font-size="10" font-weight="700" fill="${HI}">文</text>` +
  `<path d="M82,35 L118,35" stroke="${HI}" stroke-width="1" stroke-opacity=".5"/>` +
  `<path d="M80,24 C84,21 90,20.5 95,20.5" fill="none" stroke="${HI}" stroke-width="1.6" stroke-linecap="round"/>` +
  // collar ring where the dome sits on the body
  `<rect x="26" y="140" width="148" height="18" rx="9" fill="${RED}"/>` +
  `<path d="M150,158 L165,158 A9,9 0 0 0 174,149 A9,9 0 0 0 166,140 C170,146 166,154 150,158Z" fill="${RED_SHADE}"/>` +
  `<path d="M36,145 L110,145" stroke="${HI}" stroke-width="1.6" stroke-linecap="round"/>` +
  // body
  `<path d="M34,158 L166,158 L166,264 Q166,276 154,276 L46,276 Q34,276 34,264Z" fill="${RED}"/>` +
  `<path d="M150,158 L166,158 L166,264 Q166,276 154,276 L60,276 C120,272 152,250 150,158Z" fill="${RED_SHADE}"/>` +
  `<path d="M40,166 L40,226" stroke="${HI}" stroke-width="1.6" stroke-linecap="round"/>` +
  // feet
  `<path d="M46,276 L68,276 L66,286 Q65,289 62,289 L52,289 Q49,289 48,286Z" fill="${RED_DEEP}"/>` +
  `<path d="M132,276 L154,276 L152,286 Q151,289 148,289 L138,289 Q135,289 134,286Z" fill="${RED_DEEP}"/>` +
  // cream face plate
  `<rect x="46" y="164" width="108" height="68" rx="10" fill="${CREAM}"/>` +
  `<path d="M140,164 L144,164 Q154,164 154,174 L154,222 Q154,232 144,232 L70,232 C120,228 142,212 140,164Z" fill="${CREAM_SHADE}"/>` +
  // price window with one mon coin
  `<rect x="54" y="170" width="34" height="22" rx="5" fill="${RED_DEEP}"/>` +
  `<rect x="56.5" y="172.5" width="29" height="17" rx="3.5" fill="#FBF6EC"/>` +
  `<circle cx="71" cy="181" r="6.6" fill="${GOLD}"/><path d="M75.7,176.3 A6.6,6.6 0 0 1 66,185.4 C71,186 76,182 75.7,176.3Z" fill="${GOLD_SHADE}"/>` +
  `<rect x="69" y="179" width="4" height="4" fill="${RED_DEEP}"/>` +
  `<path d="M66.6,179.4 A4.6,4.6 0 0 1 69.2,176.6" fill="none" stroke="${HI}" stroke-width="1.1" stroke-linecap="round"/>` +
  // coin slot plate
  `<rect x="116" y="170" width="28" height="22" rx="5" fill="${SILVER}"/>` +
  `<path d="M139,170.3 Q144,171 144,176 L144,187 Q144,192 139,192 L120,192 C132,190 139,184 139,170.3Z" fill="${SILVER_SHADE}"/>` +
  `<rect x="127.8" y="173.5" width="4.4" height="15" rx="2.2" fill="${INK}"/>` +
  `<path d="M119.5,185 L119.5,175" stroke="${HI}" stroke-width="1.4" stroke-linecap="round"/>` +
  // socket the handle turns in
  `<circle cx="101.5" cy="211.5" r="21" fill="${CREAM_SHADE}"/>` +
  `<circle cx="100" cy="210" r="20.5" fill="${RED_SHADE}"/>` +
  // chute opening with a flap
  `<path d="M70,272 L70,252 Q70,238 84,238 L116,238 Q130,238 130,252 L130,272Z" fill="${RED_DEEP}"/>` +
  `<path d="M75,272 L75,253 Q75,243 85,243 L115,243 Q125,243 125,253 L125,272Z" fill="#4A2420"/>` +
  `<path d="M75,253 Q75,243 85,243 L115,243 Q125,243 125,253 L125,255 L75,255Z" fill="${SILVER}"/>` +
  `<path d="M75,255 L125,255" stroke="${SILVER_SHADE}" stroke-width="1.2"/>` +
  `<rect x="66" y="270" width="68" height="5" rx="2.5" fill="${RED_DEEP}"/>`;

const H = [100, 210] as const;

const handle =
  `<circle cx="${H[0]}" cy="${H[1]}" r="18.5" fill="${SILVER}"/>` +
  `<circle cx="${H[0]}" cy="${H[1]}" r="17.5" fill="none" stroke="${SILVER_SHADE}" stroke-width="2"/>` +
  `<path d="M${H[0]},${H[1] - 11.5} V${H[1] + 11.5} M${H[0] - 11.5},${H[1]} H${H[0] + 11.5}" stroke="${RED_SHADE}" stroke-width="9" stroke-linecap="round"/>` +
  `<path d="M${H[0]},${H[1] - 12.5} V${H[1] + 10.5} M${H[0] - 12.5},${H[1] - 1} H${H[0] + 10.5}" stroke="${RED}" stroke-width="7.5" stroke-linecap="round"/>` +
  `<circle cx="${H[0] - 0.5}" cy="${H[1] - 0.5}" r="3.4" fill="${GOLD}"/>` +
  `<path d="M${H[0] - 1.6},${H[1] - 12} v5" stroke="${HI}" stroke-width="1.4" stroke-linecap="round"/>` +
  `<path d="M${H[0] - 12},${H[1] - 2} h5" stroke="${HI}" stroke-width="1.4" stroke-linecap="round"/>`;

export const MACHINE = {
  back,
  capsules,
  front,
  handle,
  handleCenter: H,
  chuteExit: [100, 260] as const,
};
