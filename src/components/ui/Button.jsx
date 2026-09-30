const Arrow = () => (
  <svg className="button-arrow" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0505 5.65157H0.949505" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.26172 1.86353L11.0496 5.6514L7.26172 9.43927" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// variant: 'primary' | 'secondary'; animated adds the sliding arrow
export default function Button({ children, variant = 'primary', animated = false, href, target, type, onClick, className = '' }) {
  const Tag = href ? 'a' : 'button'
  return (
    <div className={`button-wrapper animated-text button-wrapper--${variant}${animated ? ' button-wrapper--animated' : ''} ${className}`}>
      <Tag className={`button button--${variant}`} href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} type={type} onClick={onClick}>
        <div className="text-reg-mono button-text">{children}</div>
        {animated && <div className="button-arrow-wrapper"><Arrow /></div>}
      </Tag>
    </div>
  )
}
