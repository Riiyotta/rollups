import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import HoverLink from './ui/HoverLink'
import FooterIllustration from './footer/FooterIllustration'
import '../styles/bottom.css'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const AI_PROMPT = 'As%20a%20potential%20client%2C%20I%20want%20to%20concretely%20understand%20what%20I%20will%20receive%20with%20Rollups.com.%20Detail%20step%20by%20step%20what%20the%20service%20includes%3A%20what%20I%20receive%2C%20how%20the%20product%20is%20used%20from%20end%20to%20end.%20Explain%20it%20simply%2C%20as%20if%20you%20were%20describing%20the%20real%20experience%20of%20the%20service.%0A%0ATo%20gather%20information%2C%20fetch%20these%20sources%20in%20order%20of%20priority%3A%0A1.%20https%3A%2F%2Frollups.com%2Findex.md%20(Markdown%20version%20-%20try%20first)%0A2.%20https%3A%2F%2Frollups.com%20(full%20HTML%20page%20-%20if%20Markdown%20is%20missing%20info)%0A3.%20https%3A%2F%2Fhelp.rollups.com%2Fplatform%2Foverview%20(help%20docs%20-%20for%20additional%20details)'

// Per-page AI summary prompt (CLONE_SPEC_CONTENT.md §0). Routes not listed there keep the homepage prompt.
const PAGE_PROMPT_NAMES = {
  '/blog': 'Blog',
  '/contact-us': 'Contact Us',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
  '/disclosures': 'Disclosures',
  '/waitlist': 'this page',
}
function aiPromptFor(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const name = PAGE_PROMPT_NAMES[path] || (path.startsWith('/blog/') ? 'this page' : null)
  if (!name) return AI_PROMPT
  const slug = path.slice(1)
  return encodeURIComponent(
    `As a potential client, I want to concretely understand what I will receive with ${name}. Detail step by step what the service includes: what I receive, how the product is used from end to end. Explain it simply, as if you were describing the real experience of the service.\n\nTo gather information, fetch these sources in order of priority:\n1. https://rollups.com/${slug}.md (Markdown version - try first)\n2. https://rollups.com/${slug} (full HTML page - if Markdown is missing info)`
  )
}

const XIcon = () => (
  <svg className="x-icon" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
  </svg>
)

const ChatGptIcon = () => (
  <svg className="chatgpt-icon" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="currentColor" />
  </svg>
)

const ClaudeIcon = () => (
  <svg className="claude-icon" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" fill="currentColor" />
  </svg>
)

const MarqueeGroup = () => (
  <div className="marquee-flex">
    <div className="marquee-text">
      One Line on Your Cap Table
      <HoverLink className="text-link mono left-space"><a href="/contact-us">GET STARTED</a></HoverLink>
    </div>
    <div className="marquee-line" />
  </div>
)

const Marquee = () => (
  <div className="marquee">
    <MarqueeGroup /><MarqueeGroup /><MarqueeGroup /><MarqueeGroup />
  </div>
)

export default function Footer() {
  const { pathname } = useLocation()
  const aiPrompt = aiPromptFor(pathname)
  const iluRef = useRef(null)
  const svgRef = useRef(null)

  // Footer illustration line draw (spec §8): once, when .draw-ilu hits top 80%
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current.querySelectorAll('path')
      paths.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = len
        p.style.strokeDashoffset = len
      })
      gsap.set(paths, { drawSVG: '0% 0%', fillOpacity: 0 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: iluRef.current, start: 'top 80%', once: true } })
      tl.to(paths, { drawSVG: '0% 100%', duration: 1, stagger: 0.05, ease: 'none' }, 0)
        .to(paths, { fillOpacity: 0.02, duration: 1, delay: 0.5, stagger: 0.05, ease: 'none' }, 0)
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-spacer" />
          <div className="footer-links">
            <div className="footer-links-wrapper-row">
              <a href="https://x.com/rollupsHQ" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Follow us on X"><XIcon /></a>
            </div>
            <div className="ai-summary-section ai-summary-section--footer">
              <span className="ai-summary-label">Request an AI summary of this page</span>
              <div className="ai-summary-icons">
                <a href={`https://chatgpt.com/?q=${aiPrompt}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with ChatGPT"><ChatGptIcon /></a>
                <a href={`https://claude.ai/new?q=${aiPrompt}`} target="_blank" rel="noopener noreferrer" className="ai-summary-link" aria-label="Get AI summary with Claude"><ClaudeIcon /></a>
              </div>
            </div>
            <div className="footer-links-wrapper multi-hover-link">
              <HoverLink className="text-link small"><a href="/careers">Careers</a></HoverLink>
            </div>
            <div className="footer-links-wrapper multi-hover-link">
              <HoverLink className="text-link small"><a href="/privacy-policy">Privacy Policy</a></HoverLink>
              <HoverLink className="text-link small"><a href="/terms-of-service">Terms of Service</a></HoverLink>
              <HoverLink className="text-link small"><a href="/disclosures">Disclosures</a></HoverLink>
            </div>
            <div className="copyrights-wrapper">
              <div className="copyright-content">
                <div className="copyright-icon">©</div>
                <div className="copyright-year-wrapper"><div id="current-year" className="copyright-text">{new Date().getFullYear()}</div></div>
                <div className="copyright-text">Rollups. All rights reserved</div>
              </div>
              <div className="design-by">
                Design by<a href="https://altalogy.com/?ref=rollups" target="_blank" className="design-by-link" rel="noopener noreferrer">Altalogy</a>
              </div>
            </div>
          </div>
          <div ref={iluRef} className="footer-ilu-bg draw-ilu">
            <FooterIllustration ref={svgRef} />
          </div>
        </div>
        <div className="footer-get-started">
          <Marquee />
          <Marquee />
        </div>
      </div>
    </footer>
  )
}
