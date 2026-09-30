import RaiseHero from '../components/raise/RaiseHero'
import FounderOptions from '../components/raise/FounderOptions'
import HowToRaiseSection from '../components/raise/HowToRaiseSection'
import ComparisonTable from '../components/raise/ComparisonTable'
import CleanCapTable from '../components/raise/CleanCapTable'
import FactsCta from '../components/calculator/FactsCta'
import Calculator from '../components/calculator/Calculator'
import StoriesGrid from '../components/calculator/StoriesGrid'
import { RUV_FAQ_ITEMS } from '../components/calculator/ruvFaqItems'
import usePageMeta from '../components/calculator/usePageMeta'
import Faq from '../components/Faq'

export default function HowToRaiseCapital() {
  usePageMeta(
    'Rollups | How Founders Can Raise Capital with SPVs and RUVs',
    'Learn how founders can raise capital using SPVs and Roll Up Vehicles (RUVs), including costs, control, and cap table impact.'
  )
  return (
    <>
      <RaiseHero />
      <FounderOptions />
      <HowToRaiseSection />
      <ComparisonTable />
      <CleanCapTable />
      <FactsCta />
      <Calculator />
      <StoriesGrid />
      <Faq title="Everything You Need to Know" items={RUV_FAQ_ITEMS} />
    </>
  )
}
