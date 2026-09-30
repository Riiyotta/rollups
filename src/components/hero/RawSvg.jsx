// Renders an extracted SVG file (imported with ?raw) as a real inline <svg>,
// keeping its own width/height/viewBox/fill attributes, with no wrapper element.
const ATTRS = ['width', 'height', 'viewBox', 'fill']

export default function RawSvg({ raw, className, style }) {
  const open = raw.match(/<svg([^>]*)>/)
  const inner = raw.slice(open.index + open[0].length, raw.lastIndexOf('</svg>'))
  const props = {}
  ATTRS.forEach((a) => {
    const m = open[1].match(new RegExp(`\\s${a}="([^"]*)"`))
    if (m) props[a] = m[1]
  })
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}
