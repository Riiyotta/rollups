import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import checkSvg from '../../../public/svg/pages/table-check.svg?raw'
import crossSvg from '../../../public/svg/pages/table-cross.svg?raw'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §4.4 — class names keep the original's "comparision" typo. No reveal classes.
const CHECK = { icon: 'check' }
const CROSS = { icon: 'cross' }
const COLUMNS = ['No Vehicle', 'RUVs', 'SPVs']
const ROWS = [
  { feature: 'Pooled investors / streamlined cap table', values: [CROSS, CHECK, CHECK] },
  { feature: 'Investor costs', values: ['$0', '$0', 'Pay SPV fees and/or carry'] },
  { feature: 'Can founder run it themselves?', values: [CHECK, CHECK, CROSS] },
  {
    feature: 'Company costs',
    values: ['SAFEs free upfront, costs compound later', 'Free to raise, one-time flat fee paid by company at close', 'Paid by the SPV GP out of investor capital'],
  },
  { feature: 'Professional administration/tax', values: [CROSS, CHECK, CHECK] },
  {
    feature: 'Investor voting',
    values: [
      'Investor decides for themselves',
      'Company can handle routine votes. Professional management by Rollups & AngelList when there are potential conflicts.',
      'SPV VC decides on behalf of investors. Founder can be conflicted if they are the SPV Manager.',
    ],
  },
  { feature: 'Exit management', values: ['Self-managed', 'Professionally managed', 'Professionally managed'] },
]

// rows 2, 4 and 6 (1-based) get the alt background
const alt = (i) => (i % 2 === 1 ? ' comparision-table-cell-alt-bg' : '')

function Value({ v }) {
  if (v === CHECK) {
    return <div className="comparision-table-icon-wrapper comparision-table-icon-wrapper-check"><RawSvg raw={checkSvg} /></div>
  }
  if (v === CROSS) {
    return <div className="comparision-table-icon-wrapper comparision-table-icon-wrapper-cross"><RawSvg raw={crossSvg} /></div>
  }
  return <p className="comparision-table-text-value">{v}</p>
}

// Overflow logic: hasOverflow = scrollWidth - clientWidth > 1; left/right scrollable with an 8px tolerance
function useScrollFade(ref) {
  const [state, setState] = useState({ overflow: false, left: false, right: false })
  useEffect(() => {
    const el = ref.current
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      const overflow = max > 1
      setState({ overflow, left: overflow && el.scrollLeft > 8, right: overflow && el.scrollLeft < max - 8 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [ref])
  return state
}

export default function ComparisonTable() {
  const scrollRef = useRef(null)
  const { overflow, left, right } = useScrollFade(scrollRef)
  const fade = left && right ? ' fade-x' : right ? ' fade-right' : left ? ' fade-left' : ''

  return (
    <section className="section rollups-section">
      <div className="container">
        <div className="comparision-table">
          <div className="comparision-table-header">
            <h2 className="comparision-table-title">How they compare</h2>
            <p className="comparision-table-description">A side-by-side look at the key differences between each fundraising approach.</p>
            <Button variant="primary" animated href="/assets/pages/rollups-faq-for-founders.pdf">Download PDF Guide</Button>
          </div>
          <div className={`comparision-table-table-wrapper${overflow ? ' comparision-table-table-wrapper--scrollable' : ''}`}>
            <div className="comparision-table-table-content">
              <div ref={scrollRef} className={`comparision-table-table-scroll${fade}`} aria-label="Fundraising comparison table">
                <div className="comparision-table-table">
                  <div className="comparision-table-column comparision-table-column-features">
                    <div className="comparision-table-cell comparision-table-cell-header" />
                    {ROWS.map((r, i) => (
                      <div key={r.feature} className={`comparision-table-cell comparision-table-cell-feature${alt(i)}`}>
                        <p className="comparision-table-feature-text">{r.feature}</p>
                      </div>
                    ))}
                  </div>
                  {COLUMNS.map((col, c) => (
                    <div key={col} className="comparision-table-column">
                      <div className="comparision-table-cell comparision-table-cell-header">
                        <p className="comparision-table-header-text">{col}</p>
                      </div>
                      {ROWS.map((r, i) => (
                        <div key={r.feature} className={`comparision-table-cell${alt(i)}`}>
                          <Value v={r.values[c]} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
