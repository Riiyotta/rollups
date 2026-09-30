import Home from './Home'
import Ruv from './Ruv'
import RuvCalculator from './RuvCalculator'
import Safe from './Safe'
import HowToRaiseCapital from './HowToRaiseCapital'
import Consolidate from './Consolidate'
import Waitlist from './Waitlist'
import ContactUs from './ContactUs'
import Blog from './Blog'
import BlogPost from './BlogPost'
import Legal from './Legal'
import Placeholder from './Placeholder'

// One entry per sitemap URL, plus dummy stops for links that don't exist on this clone
export const routes = [
  { path: '/', element: <Home /> },
  { path: '/ruv', element: <Ruv /> },
  { path: '/ruv/calculator', element: <RuvCalculator /> },
  { path: '/safe', element: <Safe /> },
  { path: '/how-to-raise-capital', element: <HowToRaiseCapital /> },
  { path: '/consolidate', element: <Consolidate /> },
  { path: '/waitlist', element: <Waitlist /> },
  { path: '/contact-us', element: <ContactUs /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:slug', element: <BlogPost /> },
  { path: '/privacy-policy', element: <Legal page="privacy-policy" /> },
  { path: '/terms-of-service', element: <Legal page="terms-of-service" /> },
  { path: '/disclosures', element: <Legal page="disclosures" /> },
  // Dummy pages: these paths aren't in the cloned sitemap, so links to them go here instead of off-site
  { path: '/careers', element: <Placeholder title="Careers" /> },
  { path: '/customers', element: <Placeholder title="Customer Stories" /> },
]
