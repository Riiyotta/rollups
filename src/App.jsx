import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import useReveal from './hooks/useReveal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBar from './components/CookieBar'
import SignUp from './pages/SignUp'
import { routes } from './pages/routes'

// Client-side navigation for plain same-origin <a href="/..."> links (like Next's Link)
function useLinkInterceptor() {
  const navigate = useNavigate()
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      const local = url.origin === location.origin || url.hostname === 'rollups.com' || url.hostname === 'www.rollups.com'
      if (!local || url.pathname.startsWith('/assets') || (url.hash && url.pathname === location.pathname)) return
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}

function Layout() {
  const { pathname } = useLocation()
  useLinkInterceptor()
  useReveal(pathname)
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Navbar />
      <main>
        <div className="page-fade-in" key={pathname}>
          <Routes>
            {routes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
          </Routes>
        </div>
      </main>
      <Footer />
      <CookieBar />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone: no marketing navbar/footer, matching the real app.rollups.com/setup page
            that "Sign In" / "Get Started" link to on the live site. */}
        <Route path="/get-started" element={<SignUp />} />
        <Route path="/setup" element={<SignUp />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}
