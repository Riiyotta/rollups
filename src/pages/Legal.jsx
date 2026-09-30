import LegalContent from '../components/legal/LegalContent'
import usePageMeta from '../components/blog/usePageMeta'
import { legalPages } from '../data/legal'
import '../styles/legal.css'

// Shared legal template: /privacy-policy, /terms-of-service, /disclosures (CLONE_SPEC_CONTENT.md §5)
export default function Legal({ page }) {
  const data = legalPages[page]
  usePageMeta(data.metaTitle, data.metaDescription)
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="container-policy container-policy-header">
            <h1 className="heading">{data.title}</h1>
            <p className="text-reg text-light-300">{data.lastModified}</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="container-policy container-policy-content">
            <LegalContent blocks={data.blocks} />
          </div>
        </div>
      </section>
    </>
  )
}
