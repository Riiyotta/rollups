import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import RawSvg from './hero/RawSvg'
import logoSvg from '../../public/svg/logo-rollups.svg?raw'
import { NAV_MENUS, MOBILE_MENUS } from './navbar/menus'
import '../styles/top.css'

const DropdownArrow = ({ rotated }) => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`nav-dropdown-arrow ${rotated ? 'rotated' : ''}`}>
    <path d="M1 1.3L5.5 5.7L10 1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MobileArrow = ({ rotated }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={`nav-mobile-arrow ${rotated ? 'rotated' : ''}`}>
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Desktop dropdown: opens on hover; close after 150ms mouseleave delay, unmount 200ms later.
function NavDropdown({ menu, openId, setOpenId }) {
  const wrapRef = useRef(null)
  const closeTimer = useRef(null)
  const unmountTimer = useRef(null)
  const menuRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)
  const [left, setLeft] = useState(0)
  const open = openId === menu.id

  useEffect(() => {
    if (open) {
      clearTimeout(unmountTimer.current)
      setLeft(wrapRef.current.getBoundingClientRect().left)
      setMounted(true)
      return
    }
    setEntered(false)
    unmountTimer.current = setTimeout(() => setMounted(false), 200)
    return () => clearTimeout(unmountTimer.current)
  }, [open])

  // Live site: the enter class lands in the same frame the menu mounts (transition visibly starts one frame later).
  // Commit the hidden state with a forced style flush, then add .nav-dropdown-menu-enter before paint.
  useLayoutEffect(() => {
    if (!mounted || !open || entered) return
    if (menuRef.current) menuRef.current.getBoundingClientRect()
    setEntered(true)
  }, [mounted, open, entered])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const onEnter = () => {
    clearTimeout(closeTimer.current)
    setOpenId(menu.id)
  }
  const onLeave = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenId((cur) => (cur === menu.id ? null : cur)), 150)
  }

  return (
    // Plain .link-component: on the live site the dropdown triggers have no link-box sweep and don't dim siblings
    <div className="link-component nav-link with-padding hide-mobile text-reg nav-dropdown-wrapper">
      <div className="link-box" />
      <button
        ref={wrapRef}
        className="nav-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
      >
        {menu.label}
        <DropdownArrow rotated={mounted} />
      </button>
      {mounted && (
        <div
          ref={menuRef}
          className={`nav-dropdown-menu ${entered ? 'nav-dropdown-menu-enter' : ''}`}
          style={{ left }}
          role="menu"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {menu.groups.map((g, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="nav-dropdown-divider" />}
              {g.title && (
                <div className="nav-dropdown-section">
                  <div className="nav-dropdown-section-title">{g.title}</div>
                </div>
              )}
              {g.items.map((it) => (
                <a key={it.label} className="nav-dropdown-item" href={it.href} role="menuitem" {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {it.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [openId, setOpenId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  // each mobile section toggles independently (both can be open at once on the live site)
  const [expanded, setExpanded] = useState({})
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false)
  const [ctaMounted, setCtaMounted] = useState(false)

  // Mobile menu open state: body.disable-scroll + navbar.is-open
  useEffect(() => {
    document.body.classList.toggle('disable-scroll', menuOpen)
    return () => document.body.classList.remove('disable-scroll')
  }, [menuOpen])

  // Close the mobile menu if the viewport grows past the tablet breakpoint
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 991) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // .mobile-get-started-wrapper (live Navigation component): while the hero form is out of view the
  // wrapper mounts immediately at opacity 0 / translateY(10px), and .visible is added 100ms later
  // (.3s cubic-bezier(.4,0,.2,1)). When the form comes back it unmounts at once.
  useEffect(() => {
    const form = document.querySelector('.form-wrapper .form')
    if (!form) return
    let t
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(t)
        if (entry.isIntersecting) { setMobileCtaVisible(false); setCtaMounted(false) }
        else { setCtaMounted(true); t = setTimeout(() => setMobileCtaVisible(true), 100) }
      },
      { threshold: 0.1, rootMargin: '-100px 0px' }
    )
    io.observe(form)
    return () => { clearTimeout(t); io.disconnect() }
  }, [])

  const toggleMenu = () => {
    setMenuOpen((o) => !o)
    setExpanded({})
  }

  return (
    <header className={`navbar ${menuOpen ? 'is-open' : ''}`} role="banner">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logos-wrapper">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <a className="logo-wrapper nav-logo" aria-current="page" href="/">
                <RawSvg raw={logoSvg} />
                <div className="text-book text-logo">rollups</div>
              </a>
            </div>
          </div>
          <nav className="nav-menu" role="navigation">
            <div className="nav-links">
              <div className="multi-hover-link">
                {NAV_MENUS.map((m) => (
                  <NavDropdown key={m.id} menu={m} openId={openId} setOpenId={setOpenId} />
                ))}
              </div>
            </div>
            <div className="multi-hover-link sign-in-desktop-only">
              <Button variant="secondary" animated href="/get-started">Sign In</Button>
            </div>
            <div className="get-started-wrapper radial-gradient desktop-only">
              <Button variant="primary" animated href="/contact-us">Get Started</Button>
            </div>
            <div className="get-started-wrapper multi-hover-link sign-in-mobile-only hide-mobile-xs">
              <Button variant="secondary" animated href="/get-started">Sign In</Button>
            </div>
            {/* live site: only mounted while the hero form is out of view; anchor has no .mobile-get-started-btn class */}
            {ctaMounted && (
              <div className={`mobile-get-started-wrapper hide-mobile-2xs ${mobileCtaVisible ? 'visible' : ''}`}>
                <div className="radial-gradient">
                  <Button variant="primary" animated href="/contact-us">Get Started</Button>
                </div>
              </div>
            )}
          </nav>
          <div
            className="hamburger-menu"
            role="button"
            tabIndex={0}
            onClick={toggleMenu}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu() } }}
          >
            <button className="hamburger-menu-btn" aria-label="Toggle menu" data-visible={!menuOpen} tabIndex={-1}>Menu</button>
            <button className="hamburger-menu-btn" aria-label="Toggle menu" data-visible={menuOpen} tabIndex={-1}>Close</button>
          </div>
        </div>

        <nav className={`nav-mobile-menu ${menuOpen ? 'is-open' : ''}`} role="navigation">
          <div className="nav-mobile-menu-container">
            <div className="nav-mobile-menu-links">
              {MOBILE_MENUS.map((m) => {
                const isOpen = !!expanded[m.id]
                return (
                  <div className="nav-mobile-resources" key={m.id}>
                    <button className="nav-mobile-link nav-mobile-expandable" aria-expanded={isOpen} onClick={() => setExpanded((e) => ({ ...e, [m.id]: !e[m.id] }))}>
                      {m.label}
                      <MobileArrow rotated={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="nav-mobile-submenu">
                        {m.entries.map((it, i) =>
                          it.divider ? (
                            <div key={i} className="nav-mobile-submenu-divider" role="separator" aria-hidden="true" />
                          ) : it.title ? (
                            <div key={i} className="nav-mobile-submenu-title">{it.title}</div>
                          ) : (
                            <a key={i} className="nav-mobile-sublink" href={it.href} {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                              {it.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="nav-mobile-footer">
              <a className="nav-mobile-cta" href="/contact-us">Get Started</a>
              <a href="/get-started" className="nav-mobile-sign-in-footer">Sign In</a>
            </div>
            <div className="nav-mobile-menu-footer">
              <div className="footer-links">
                <div className="footer-links-wrapper">
                  <a className="text-link" href="/privacy-policy">Privacy Policy</a>
                  <a className="text-link" href="/terms-of-service">Terms of Service</a>
                </div>
                <div className="copyrights-wrapper">
                  <div className="copyright-icon">©</div>
                  <div className="copyright-year-wrapper"><div className="copyright-text">2026</div></div>
                  <div className="copyright-text">Rollups. All rights reserved</div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
