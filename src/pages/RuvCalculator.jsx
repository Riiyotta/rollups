import Calculator from '../components/calculator/Calculator'
import FactsCta from '../components/calculator/FactsCta'
import StoriesGrid from '../components/calculator/StoriesGrid'
import { RUV_FAQ_ITEMS } from '../components/calculator/ruvFaqItems'
import usePageMeta from '../components/calculator/usePageMeta'
import Faq from '../components/Faq'
import '../styles/raise.css'

// CLONE_SPEC_PRODUCTS.md §2.1 — no animation classes; the section only gets the page fade-in
function CalculatorHero() {
  return (
    <section className="section ruv-calculator-hero-section">
      <div className="container">
        <div className="ruv-calculator-hero">
          <p className="ruv-calculator-hero-eyebrow">Calculator</p>
          <h1 className="ruv-calculator-hero-title">Roll Up Vehicle Cost Comparison</h1>
          <p className="ruv-calculator-hero-description">
            In addition to keeping a clean cap table, <a href="/ruv">Roll Up Vehicles</a> can present significant cost savings over the lifetime of the company. This calculator presents an estimate of savings from using a Roll Up Vehicle over direct investments.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function RuvCalculator() {
  usePageMeta(
    'Rollups | Roll Up Vehicle Cost Comparison',
    'Compare the lifetime cost of direct investments against a Roll Up Vehicle for your fundraise.'
  )
  return (
    <>
      <CalculatorHero />
      <Calculator />
      <FactsCta />
      <StoriesGrid />
      <Faq title="Everything You Need to Know" items={RUV_FAQ_ITEMS} />
    </>
  )
}
