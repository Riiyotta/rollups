import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import autograph from '../../../public/svg/pages/story-logo-autograph.svg?raw'
import fnHealth from '../../../public/svg/pages/story-logo-function.svg?raw'
import rollfi from '../../../public/svg/pages/story-logo-rollfi.svg?raw'
import stellate from '../../../public/svg/pages/story-logo-stellate.svg?raw'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §2.4 — quotes are wrapped in literal " characters
const STORIES = [
  {
    logo: autograph,
    quote: "I recommend RUVs to every founder. It's one of the most important developments in startup financing in the last decade. I think we'll look back in 10 years and realize that it's had as big an impact as SAFEs.",
    author: 'Hari Raghavan, CEO, Autograph',
  },
  {
    logo: fnHealth,
    quote: 'Function Health raised much of its seed and pre-A using an AngelList RUV. I recommend it to every founder.',
    author: 'Jonathan Swerdlin, Co-founder, Function Health',
  },
  {
    logo: rollfi,
    quote: "The RUVs we ran saved so much time not only during Rollfi's fundraises but also we when got acquired by Priority.",
    author: 'Kirubha Perumalsamy, Founder, Rollfi',
  },
  {
    logo: stellate,
    quote: 'We used an RUV at Stellate with great success. 11/10 would recommend to all founders raising from individual angels',
    author: 'Max Stoiber, CEO and Co-Founder, Stellate',
  },
]

export default function StoriesGrid() {
  return (
    <section className="section stories-grid how-to-raise-testimonials">
      <div className="container">
        <div className="stories">
          {STORIES.map((s) => (
            <div className="story-card grid-item-border sm" key={s.author}>
              <div className="content">
                <div className="logo"><RawSvg raw={s.logo} /></div>
                <h4 className="quote animation-text">"{s.quote}"</h4>
                <p className="author animation-text">{s.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ruv-testimonials-grid-footer">
          <Button variant="secondary" animated href="/customers">Read more customer stories</Button>
        </div>
      </div>
    </section>
  )
}
