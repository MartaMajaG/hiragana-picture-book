// Shared SVG defs. Illustrations are flat fills; filters here roughen the ink into brushwork and give stickers their die-cut edge. Rendered once, off-screen, and referenced by id from every stage.
// (Kept out of display:none on purpose: some browsers drop gradients defined in hidden SVGs.)
const DEFS = `<defs>
    <filter id="brush" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0.5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="rough" x="-3%" y="-3%" width="106%" height="106%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="11" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="silhouette" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="3.4" result="d"/>
      <feFlood flood-color="#fff"/><feComposite in2="d" operator="in"/>
    </filter>
    <filter id="diecut" x="-25%" y="-25%" width="150%" height="150%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="3.4" result="d"/>
      <feFlood flood-color="#fffaf0"/><feComposite in2="d" operator="in" result="border"/>
      <feGaussianBlur in="d" stdDeviation="1.4"/><feOffset dx="0.8" dy="1.8" result="o"/>
      <feFlood flood-color="#3a2a1a" flood-opacity=".32"/><feComposite in2="o" operator="in" result="shadow"/>
      <feMerge><feMergeNode in="shadow"/><feMergeNode in="border"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

export default function SvgDefs() {
  return <svg className="svg-defs" aria-hidden="true" dangerouslySetInnerHTML={{ __html: DEFS }} />;
}
