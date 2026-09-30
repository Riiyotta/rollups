// Button state icons, same as the homepage hero form on the original (webpack modules 96706 / 24002).
const RING =
  'M2.25 7L3.75 7C3.75 4.92893 5.42893 3.25 7.5 3.25L7.5 1.75L7.5 0.25C3.77208 0.249999 0.750001 3.27208 0.75 7L2.25 7ZM7.5 1.75L7.5 3.25C9.57107 3.25 11.25 4.92893 11.25 7L12.75 7L14.25 7C14.25 3.27208 11.2279 0.25 7.5 0.25L7.5 1.75ZM12.75 7L11.25 7C11.25 9.07107 9.57107 10.75 7.5 10.75L7.5 12.25L7.5 13.75C11.2279 13.75 14.25 10.7279 14.25 7L12.75 7ZM7.5 12.25L7.5 10.75C5.42893 10.75 3.75 9.07107 3.75 7L2.25 7L0.75 7C0.75 10.7279 3.77208 13.75 7.5 13.75L7.5 12.25Z'

// "SUBMITTING" spinner (15x14, .rotate-animation)
export const SpinnerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" className="rotate-animation">
    <g clipPath="url(#clip0_3103_1827)">
      <mask id="path-1-inside-1_3103_1827" fill="white">
        <path d="M7.5 1.75C4.60051 1.75 2.25 4.1005 2.25 7C2.25 9.89949 4.6005 12.25 7.5 12.25C10.3995 12.25 12.75 9.89949 12.75 7C12.75 4.1005 10.3995 1.75 7.5 1.75Z" />
      </mask>
      <g clipPath="url(#paint0_angular_3103_1827_clip_path)" mask="url(#path-1-inside-1_3103_1827)">
        <g transform="matrix(4.5897e-10 -0.00525 0.00525 4.5897e-10 7.5 7)">
          <foreignObject x="-1285.71" y="-1285.71" width="2571.43" height="2571.43">
            <div
              style={{
                background: 'conic-gradient(from 90deg,rgba(42, 93, 51, 1) 0deg,rgba(228, 234, 200, 1) 360deg)',
                height: '100%',
                width: '100%',
                opacity: 1,
              }}
            />
          </foreignObject>
        </g>
      </g>
      <path d={RING} mask="url(#path-1-inside-1_3103_1827)" />
    </g>
    <defs>
      <clipPath id="paint0_angular_3103_1827_clip_path">
        <path d={RING} mask="url(#path-1-inside-1_3103_1827)" />
      </clipPath>
      <clipPath id="clip0_3103_1827">
        <rect width="14" height="14" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)

// "SUBMITTED" check (15x14, stroke #2A5D33)
export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
    <g clipPath="url(#clip0_3202_5052)">
      <path d="M5.3125 7.4375L6.625 8.75L9.6875 5.6875" stroke="#2A5D33" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.5 12.25C10.3995 12.25 12.75 9.8995 12.75 7C12.75 4.10051 10.3995 1.75 7.5 1.75C4.60051 1.75 2.25 4.10051 2.25 7C2.25 9.8995 4.60051 12.25 7.5 12.25Z"
        fill="#2A5D33"
        fillOpacity="0.08"
        stroke="#2A5D33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3202_5052">
        <rect width="14" height="14" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
)
