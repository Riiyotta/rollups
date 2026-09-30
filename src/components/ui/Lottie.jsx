import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

// Loads /lottie/<name>.json with the SVG renderer (the original uses lottie-react / SVG)
export default function Lottie({ src, loop = true, autoplay = true, className = '', style, onReady }) {
  const ref = useRef(null)
  useEffect(() => {
    const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop, autoplay, path: src })
    if (onReady) anim.addEventListener('DOMLoaded', () => onReady(anim))
    return () => anim.destroy()
  }, [src, loop, autoplay])
  return <div ref={ref} className={className} style={style} />
}
