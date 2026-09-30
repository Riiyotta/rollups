import Button from '../ui/Button'
import RawSvg from '../hero/RawSvg'
import checkSvg from '../../../public/svg/pages/feature-check.svg?raw'
import '../../styles/products.css'

function PriceCell({ cell, className }) {
  return (
    <div className={`content-grid-item price-item ${className}`}>
      <div className="price-header">
        <h2 className="text-book text-light-100 animation-text book">{cell.name}</h2>
        {cell.description && <p className="text-reg text-light-200 animation-text">{cell.description}</p>}
      </div>
      {cell.price && (
        <div className="price-label-wrapper animation-text">
          <p className="price-label">{cell.price}</p>
          {cell.unit && <p className="price-label-unit">{cell.unit}</p>}
        </div>
      )}
      <Button variant={cell.button.variant} animated href={cell.button.href} target={cell.button.target}>
        {cell.button.label}
      </Button>
    </div>
  )
}

function FeaturesCell({ cell, className }) {
  return (
    <div className={`content-grid-item price-item ${className}`}>
      <div className="features-list-wrapper">
        <div className="text-reg-mono text-allcaps light-300 animation-text">{cell.label}</div>
        <ul className="features-list">
          {cell.features.map((f) => (
            <li key={f} className="features-list-item animation-text">
              <RawSvg raw={checkSvg} />
              <p className="text-reg text-light-200">{f}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * section.pricing-section (spec 1.6 / 3.5 / 5.6)
 * - title: heading text
 * - cells: 3 or 4 entries, in grid order. A price cell is { name, description?, price?, unit?, button: { label, href, variant, target? } };
 *   a features cell is { label, features: [string] }.
 *   Cells 1-2 get .no-top-border; cells 3-4 get .no-bottom-border.no-top-border.
 * - withBottomBorder: container .with-bottom-border (false on /consolidate)
 */
export default function Pricing({ title, cells, withBottomBorder = true }) {
  return (
    <section className="section pricing-section">
      <div id="pricing" />
      <div className={`container with-top-padding${withBottomBorder ? ' with-bottom-border' : ''}`}>
        <div className="heading-wrapper with-padding">
          <h2 className="heading animation-text">{title}</h2>
        </div>
        <div className="content-grid-wrapper with-y-padding">
          <div className="content-grid">
            {cells.map((cell, i) => {
              const cls = i < 2 ? 'no-top-border' : 'no-bottom-border no-top-border'
              return cell.features
                ? <FeaturesCell key={i} cell={cell} className={cls} />
                : <PriceCell key={i} cell={cell} className={cls} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
