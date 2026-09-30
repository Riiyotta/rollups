const ArrowIcon = () => (
  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.21875 10C6.94261 10 6.71875 10.2239 6.71875 10.5C6.71875 10.7761 6.94261 11 7.21875 11V10ZM14.1348 10.8536C14.3301 10.6583 14.3301 10.3417 14.1348 10.1464L10.9528 6.96447C10.7576 6.7692 10.441 6.7692 10.2457 6.96447C10.0505 7.15973 10.0505 7.47631 10.2457 7.67157L13.0741 10.5L10.2457 13.3284C10.0505 13.5237 10.0505 13.8403 10.2457 14.0355C10.441 14.2308 10.7576 14.2308 10.9528 14.0355L14.1348 10.8536ZM7.21875 10.5V11H13.7812V10.5V10H7.21875V10.5Z" fill="currentColor" />
  </svg>
)

export default function LearnMore({ href = '#', children = 'Learn more', className = '' }) {
  return (
    <a href={href} className={`learn-more-link ${className}`}>
      <div className="text-reg-mono text-allcaps">{children}</div>
      <div className="learn-more-icon"><ArrowIcon /><ArrowIcon /></div>
    </a>
  )
}
