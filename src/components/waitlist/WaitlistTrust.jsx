import RawSvg from '../hero/RawSvg'
import trusted1 from '../../../public/svg/trusted-logo-1.svg?raw'
import trusted2 from '../../../public/svg/trusted-logo-2.svg?raw'
import trusted3 from '../../../public/svg/trusted-logo-3.svg?raw'
import trusted4 from '../../../public/svg/trusted-logo-4.svg?raw'
import trusted5 from '../../../public/svg/trusted-logo-5.svg?raw'
import '../../styles/top.css'

// replit, Notion, Kit, BASE, Lovable (same block as the homepage hero .trusted-wrapper)
const TRUSTED_LOGOS = [trusted1, trusted2, trusted3, trusted4, trusted5]

// §1.3 Trust band. The trusted-logo list is not scroll-revealed (§1.9).
export default function WaitlistTrust() {
  return (
    <section className="section waitlist-trust">
      <div className="container">
        <div className="waitlist-trust-wrapper">
          <div className="waitlist-trust-header">
            <p className="text-reg-mono text-allcaps text-light-300 animation-text">Platform</p>
            <h2 className="heading animation-text">Run your investor waitlist on trusted private market infrastructure</h2>
          </div>
          <div className="waitlist-trust-body">
            <p className="text-book normal-line text-light-100 animation-text waitlist-trust-kicker">
              Powered by AngelList, your investor waitlist converts to capital in a few clicks.
            </p>
            <p className="text-reg text-light-100 animation-text waitlist-trust-quote-text">
              &quot;Our Waitlist enables us to avoid the cold start problem next time we need to raise. It replaced our spreadsheet b/c it&apos;s on AngelList, so we can click a button to call the capital when we are ready. Recommend you always have an investor waitlist as a founder.&quot;
              <span className="waitlist-trust-quote-author">
                <span className="text-light-200">- Peer, Founder</span>
                <img className="waitlist-trust-quote-logo" src="/svg/pages/cal.svg" alt="Cal.com" width={80} height={16} decoding="async" />
              </span>
            </p>
          </div>
          <div className="waitlist-trust-logos">
            <div className="trusted-wrapper">
              <p className="text-reg small animation-text">Rollups is trusted by over 50,000 investors and companies</p>
              <ul role="list" className="trusted-logo-item-list">
                {TRUSTED_LOGOS.map((raw, i) => (
                  <li className="trusted-logo-item" key={i}>
                    <div className="trusted-logo"><RawSvg raw={raw} /></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
