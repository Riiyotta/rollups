import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import arrowSvg from '../../../public/svg/pages/calc-dropdown-arrow.svg?raw'
import '../../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §2.2 — state holds strings; ids are `ruv-calculator-<key>`
const DEFAULTS = {
  numberOfInvestors: '58',
  legalHourlyRate: '550',
  yearsBeforeExit: '8',
  additionalRounds: '5',
  signatureHours: '0.2',
  documentsHours: '0.5',
  capTableCost: '100',
  capTableHours: '0.1',
  futureConsents: '4',
}

const MAIN_INPUTS = [
  { key: 'numberOfInvestors', id: 'number-of-investors', label: 'Number of investors', inputMode: 'numeric' },
  { key: 'legalHourlyRate', id: 'legal-hourly-rate', label: 'Legal hourly rate', inputMode: 'decimal' },
  { key: 'yearsBeforeExit', id: 'years-before-exit', label: 'Years before exit', inputMode: 'numeric' },
  { key: 'additionalRounds', id: 'additional-rounds', label: 'Additional rounds', inputMode: 'numeric' },
]

const ADVANCED_INPUTS = [
  { key: 'signatureHours', id: 'signatureHours', label: 'Hours per investor for reach-out & correspondence', inputMode: 'decimal' },
  { key: 'documentsHours', id: 'documentsHours', label: 'Hours per investor to draft documents & collect signatures', inputMode: 'decimal' },
  { key: 'capTableCost', id: 'capTableCost', label: 'Cost per year for cap table management per shareholder', inputMode: 'decimal' },
  { key: 'capTableHours', id: 'capTableHours', label: 'Hours per cap table entry for proformas', inputMode: 'decimal' },
  { key: 'futureConsents', id: 'futureConsents', label: 'Future shareholder consents', inputMode: 'decimal' },
]

const SCENARIOS = [
  {
    key: 'seed',
    label: 'Seed round (SAFE/Notes)',
    description: 'Typical SAFE or note round assumptions with higher legal touch points.',
    overrides: { legalHourlyRate: '550', yearsBeforeExit: '8', additionalRounds: '5' },
  },
  {
    key: 'equity',
    label: 'Equity round',
    description: 'Priced equity scenario with fewer rounds and a higher legal rate.',
    overrides: { legalHourlyRate: '750', yearsBeforeExit: '6', additionalRounds: '4' },
  },
]

const num = (s) => {
  const t = parseFloat(String(s).replace(/[^\d.-]/g, ''))
  return Number.isFinite(t) ? t : 0
}
const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

// Exact formulas from the spec (verbatim logic from the original chunk). Each pair is [direct, ruv].
export function computeCosts(values, scenario) {
  const t = num(values.numberOfInvestors)
  const a = num(values.legalHourlyRate)
  const s = num(values.yearsBeforeExit)
  const r = num(values.additionalRounds)
  const o = num(values.signatureHours)
  const n = num(values.documentsHours)
  const l = num(values.capTableCost)
  const i = num(values.capTableHours)
  const c = num(values.futureConsents)
  const isSeed = scenario === 'seed' ? 1 : 0
  const initial = [t * a * n, a * n]
  const lifetime = [t * s * l, s * l]
  const additional = [t * a * r * i, a * r * i]
  const legal = [t * a * o * c, a * o * c]
  const instrument = [t * a * o * isSeed, a * o * isSeed]
  const costs = [0, 8000]
  const parts = [initial, lifetime, additional, legal, instrument, costs]
  const total = [parts.reduce((x, p) => x + p[0], 0), parts.reduce((x, p) => x + p[1], 0)]
  return { total, initial, lifetime, additional, legal, instrument, costs }
}

function InputGroup({ def, value, onChange }) {
  const id = `ruv-calculator-${def.id}`
  return (
    <div className="cost-comparision-calculator-input-group">
      <label className="cost-comparision-calculator-label" htmlFor={id}>{def.label}</label>
      <input
        id={id}
        className="cost-comparision-calculator-input"
        type="text"
        inputMode={def.inputMode}
        value={value}
        onChange={(e) => onChange(def.key, e.target.value)}
      />
    </div>
  )
}

function ResultsRow({ title, helper, pair, highlight }) {
  const values = [pair[0], pair[1], pair[0] - pair[1]]
  const labels = ['Direct invest', 'RUV', 'Savings']
  return (
    <div className={`cost-comparision-calculator-results-row${highlight ? ' cost-comparision-calculator-results-row-highlight' : ''}`}>
      <div className="cost-comparision-calculator-results-row-info">
        <p className="cost-comparision-calculator-results-row-title">{title}</p>
        <p className="cost-comparision-calculator-results-row-helper">{helper}</p>
      </div>
      <div className="cost-comparision-calculator-results-values">
        {values.map((v, k) => (
          <div key={k} className={`cost-comparision-calculator-results-value${k === 2 ? ' cost-comparision-calculator-results-value-savings' : ''}`}>
            <span className="cost-comparision-calculator-results-value-label">{labels[k]}</span>
            <span className="cost-comparision-calculator-results-value-amount">{fmt(v)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Calculator() {
  const [values, setValues] = useState(DEFAULTS)
  const [scenario, setScenario] = useState('seed')
  const [advanced, setAdvanced] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showResults, setShowResults] = useState(true)
  const wrapperRef = useRef(null)

  // mousedown outside the dropdown wrapper closes the menu
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  const current = SCENARIOS.find((s) => s.key === scenario)
  const r = useMemo(() => computeCosts(values, scenario), [values, scenario])

  const setValue = (key, v) => setValues((prev) => ({ ...prev, [key]: v }))
  const choose = (s) => {
    setScenario(s.key)
    setValues((prev) => ({ ...prev, ...s.overrides }))
    setMenuOpen(false)
  }
  const reset = () => {
    setValues(DEFAULTS)
    setScenario('seed')
    setShowResults(true)
    setMenuOpen(false)
    setAdvanced(false)
  }

  return (
    <section className="section">
      <div id="calculator" />
      <div className="container">
        <div className="cost-comparision-calculator">
          <div className="cost-comparision-calculator-content">
            <div className="cost-comparision-calculator-header">
              <h2 className="cost-comparision-calculator-title">Cost comparison</h2>
              <p className="cost-comparision-calculator-description">
                This model calculates the lifetime cost difference between a Roll Up Vehicle and direct investments. You can edit key assumptions &amp; variables below
              </p>
            </div>

            <div className="cost-comparision-calculator-inputs">
              {MAIN_INPUTS.map((d) => <InputGroup key={d.key} def={d} value={values[d.key]} onChange={setValue} />)}
            </div>

            <div className="cost-comparision-calculator-advanced">
              <div className="cost-comparision-calculator-advanced-header">
                <div className="cost-comparision-calculator-advanced-title-wrapper">
                  <h3 className="cost-comparision-calculator-advanced-title">Advanced settings</h3>
                  <p className="cost-comparision-calculator-advanced-description">Adjust the parameters for this calculation</p>
                </div>
                <button
                  type="button"
                  className={`cost-comparision-calculator-toggle${advanced ? ' cost-comparision-calculator-toggle-active' : ''}`}
                  aria-label="Toggle advanced settings"
                  aria-pressed={advanced}
                  onClick={() => setAdvanced((a) => !a)}
                >
                  <div className="cost-comparision-calculator-toggle-knob" />
                </button>
              </div>
              {advanced && (
                <div className="cost-comparision-calculator-advanced-content">
                  <div className="cost-comparision-calculator-advanced-grid">
                    {ADVANCED_INPUTS.map((d) => <InputGroup key={d.key} def={d} value={values[d.key]} onChange={setValue} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="cost-comparision-calculator-scenario-row cost-comparision-calculator-scenario-row-primary">
              <div className="cost-comparision-calculator-scenario-group">
                <label className="cost-comparision-calculator-label" id="ruv-calculator-scenario-label">Select scenario</label>
                <div className="cost-comparision-calculator-dropdown-wrapper" ref={wrapperRef}>
                  <button
                    type="button"
                    className={`cost-comparision-calculator-dropdown-trigger${menuOpen ? ' cost-comparision-calculator-dropdown-trigger-open' : ''}`}
                    aria-expanded={menuOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="ruv-calculator-scenario-label"
                    onClick={() => setMenuOpen((o) => !o)}
                  >
                    <span className="cost-comparision-calculator-dropdown-value">{current.label}</span>
                    <div className="cost-comparision-calculator-dropdown-arrow"><RawSvg raw={arrowSvg} /></div>
                  </button>
                  {menuOpen && (
                    <div className="cost-comparision-calculator-dropdown-menu" role="listbox">
                      {SCENARIOS.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          role="option"
                          aria-selected={s.key === scenario}
                          className={`cost-comparision-calculator-dropdown-item${s.key === scenario ? ' cost-comparision-calculator-dropdown-item-active' : ''}`}
                          onClick={() => choose(s)}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="cost-comparision-calculator-scenario-description">{current.description}</p>
              </div>
              <div className="cost-comparision-calculator-actions">
                <Button variant="primary" animated type="button" className="cost-comparision-calculator-calculate-button" onClick={() => setShowResults(true)}>
                  Calculate
                </Button>
                <Button variant="secondary" animated type="button" className="cost-comparision-calculator-reset-button" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>

            {showResults && (
              <div className="cost-comparision-calculator-results" role="region" aria-live="polite">
                <div className="cost-comparision-calculator-results-table-header">
                  <div />
                  <div className="cost-comparision-calculator-results-table-header-values">
                    <span>Direct invest</span>
                    <span>RUV</span>
                    <span>Savings</span>
                  </div>
                </div>
                <div className="cost-comparision-calculator-results-table">
                  <ResultsRow highlight title="Total costs" helper={current.label} pair={r.total} />
                  <ResultsRow title="Initial closing docs" helper="Drafting docs & reconciling signatures per investor." pair={r.initial} />
                  <ResultsRow title="Lifetime cap table costs" helper="Annual shareholder management fees for each investor until exit." pair={r.lifetime} />
                  <ResultsRow title="Additional rounds, legal & admin costs" helper="Cap table updates across future raises." pair={r.additional} />
                  <ResultsRow title="Shareholder consent costs" helper="Collecting signatures every time consents are needed (including exits)." pair={r.legal} />
                  <ResultsRow title="Instrument conversion" helper="SAFE/note conversions." pair={r.instrument} />
                  <ResultsRow title="RUV Admin costs" helper="Standard RUVs for US C-Corps start at $8k (due at closing)." pair={r.costs} />
                </div>
              </div>
            )}

            <p id="calculator-terms" className="cost-comparision-calculator-terms">
              <sup aria-hidden="true">†</sup> Based on Rollups pricing compared with estimated third-party setup and administration costs. Actual costs vary by company, investor count, jurisdiction, and transaction complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
