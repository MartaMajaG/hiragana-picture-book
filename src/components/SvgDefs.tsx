// Shared SVG gradients and filters. Rendered once, off-screen, and referenced by id from every stage.
// (Kept out of display:none on purpose: some browsers drop gradients defined in hidden SVGs.)
const DEFS = `<defs>
    <filter id="gouache" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="w"/>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="1.7" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="9" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.2" result="na"/>
      <feComposite in="d" in2="na" operator="in"/>
    </filter>
    <radialGradient id="gCandy2" cx=".4" cy=".36" r=".7"><stop offset="0" stop-color="#FF6E5E"/><stop offset=".42" stop-color="#E41F3A"/><stop offset=".8" stop-color="#A30E27"/><stop offset="1" stop-color="#6A0616"/></radialGradient>
    <clipPath id="appleClip"><path d="M51,54 C45,48.5 33,48 28.5,58.5 C23,72 29,89 39.5,96.5 C45,100.5 50,99 54,97 C58,99.5 64,101 71,97.5 C82,91 90,74 85,60 C80.5,48 63,47 51,54Z"/></clipPath>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2"/></filter>
    <radialGradient id="gCandy" cx=".36" cy=".3" r=".75"><stop offset="0" stop-color="#FF8A78"/><stop offset=".5" stop-color="#E02B3E"/><stop offset="1" stop-color="#921026"/></radialGradient>
    <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9BCB72"/><stop offset="1" stop-color="#4A8A48"/></linearGradient>
    <radialGradient id="gLantern"><stop offset="0" stop-color="#FFC56A" stop-opacity=".85"/><stop offset=".5" stop-color="#FFA84E" stop-opacity=".3"/><stop offset="1" stop-color="#FF9A3E" stop-opacity="0"/></radialGradient>
    <linearGradient id="gSea" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#4AA3C8"/><stop offset=".55" stop-color="#2A6E9C"/><stop offset="1" stop-color="#1C4A73"/></linearGradient>
    <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8DD83"/><stop offset=".5" stop-color="#DDAA3E"/><stop offset="1" stop-color="#A8741E"/></linearGradient>
    <radialGradient id="gCoral" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#FFA994"/><stop offset=".55" stop-color="#EA6A60"/><stop offset="1" stop-color="#BE414A"/></radialGradient>
    <radialGradient id="gBird" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#A9B7CF"/><stop offset="1" stop-color="#63748F"/></radialGradient>
    <radialGradient id="gPond" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#9ED0D8"/><stop offset="1" stop-color="#5E9FB2"/></radialGradient>
    <linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7EC1C9" stop-opacity="0"/><stop offset="1" stop-color="#3F8C9C" stop-opacity=".45"/></linearGradient>
  </defs>`;

export default function SvgDefs() {
  return <svg className="svg-defs" aria-hidden="true" dangerouslySetInnerHTML={{ __html: DEFS }} />;
}
