import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global scroll reveal, ported from the original's ScrollAnimations (layout chunk):
// - runs 100ms after mount and on every route change (original: setTimeout(h, 100) in a pathname effect)
// - every <section>; .animation-item and .animation-text BOTH tween from y:20 (text too)
// - 0.2s power2.out, 30ms stagger per section per class, start 'top 90%', play once
// - end state is left inline as filter: blur(0px) / transform: translate(0,0), same as the original
// .animation-item also carries a CSS `transition: opacity .3s ease, transform .3s ease` (index.css),
// which makes items trail the GSAP values exactly as on the live site.
export default function useReveal(key) {
  useLayoutEffect(() => {
    let ctx
    const t = setTimeout(() => {
      ctx = gsap.context(() => {
        document.querySelectorAll('section').forEach((section) => {
          ;['.animation-item', '.animation-text'].forEach((sel) => {
            section.querySelectorAll(sel).forEach((el, i) => {
              const start = (sel === '.animation-text' && el.getAttribute('data-anim-threshold')?.trim()) || 'top 90%'
              gsap.fromTo(
                el,
                { opacity: 0, y: 20, filter: 'blur(5px)' },
                {
                  opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2, delay: 0.03 * i, ease: 'power2.out',
                  scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
                }
              )
            })
          })
        })
      })
      // The hero Lottie waits for this (see Hero.jsx): on the live site its animation data is a lazily
      // imported chunk that lands after the reveal is set up, so triggers are measured pre-art layout.
      window.__revealReady = true
      window.dispatchEvent(new Event('reveal:ready'))
    }, 100)
    return () => {
      clearTimeout(t)
      if (ctx) ctx.revert()
    }
  }, [key])
}
