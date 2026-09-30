import { useRef } from 'react'
import gsap from 'gsap'

// .link-component with the GSAP light-block sweep; siblings inside .multi-hover-link dim to .5
export default function HoverLink({ href, children, className = '', as, onClick }) {
  const ref = useRef(null)
  const Tag = as || (href ? 'a' : 'div')

  const enter = () => {
    const el = ref.current
    const box = el.querySelector('.link-box')
    gsap.killTweensOf(box)
    gsap.set(box, { left: -5, width: 5 })
    gsap.to(box, { left: '100%', width: 25, duration: 1, ease: 'back.out', onComplete: () => gsap.set(box, { left: -5, width: 5 }) })
    const group = el.closest('.multi-hover-link')
    if (group) group.querySelectorAll('.link-component').forEach((s) => s !== el && gsap.to(s, { opacity: 0.5, duration: 0.1, ease: 'none' }))
  }
  const leave = () => {
    const group = ref.current.closest('.multi-hover-link')
    if (group) gsap.to(group.querySelectorAll('.link-component'), { opacity: 1, duration: 0.1, ease: 'none' })
  }

  return (
    <Tag ref={ref} href={href} onClick={onClick} className={`link-component ${className}`} onMouseEnter={enter} onMouseLeave={leave}>
      <div className="link-box" />
      {children}
    </Tag>
  )
}
