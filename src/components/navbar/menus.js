// Nav dropdown contents (spec §1 "Dropdown menus"), read from the live site at runtime.
export const NAV_MENUS = [
  {
    id: 'products',
    label: 'Products',
    groups: [
      {
        title: 'Rollups',
        items: [
          { label: 'Roll Up Vehicles', href: '/ruv' },
          { label: 'Consolidation', href: '/consolidate' },
          { label: 'Secondary Vehicles', href: '/secondary-vehicles' },
          { label: 'Investor Waitlist', href: '/waitlist' },
        ],
      },
      { items: [{ label: 'ControlOS', href: '/control-os' }] },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    groups: [
      {
        title: 'Learn',
        items: [
          { label: 'Raising with SPVs', href: '/how-to-raise-capital' },
          { label: 'Blog', href: '/blog' },
          { label: 'Customer Stories', href: '/customers' },
        ],
      },
      { title: 'Product', items: [{ label: 'SAFEs', href: '/safe' }] },
      { title: 'Support', items: [{ label: 'Help Docs', href: 'https://help.rollups.com/', external: true }] },
    ],
  },
]

// Mobile menu contents differ from desktop on the live site: Products is a flat list (no title/divider),
// Resources' "Learn" order is Blog, Customer Stories, Raising with SPVs. Titles/dividers are flat siblings.
export const MOBILE_MENUS = [
  {
    id: 'products',
    label: 'Products',
    entries: [
      { label: 'Roll Up Vehicles', href: '/ruv' },
      { label: 'Consolidation', href: '/consolidate' },
      { label: 'Secondary Vehicles', href: '/secondary-vehicles' },
      { label: 'Investor Waitlist', href: '/waitlist' },
      { label: 'ControlOS', href: '/control-os' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    entries: [
      { title: 'Learn' },
      { label: 'Blog', href: '/blog' },
      { label: 'Customer Stories', href: '/customers' },
      { label: 'Raising with SPVs', href: '/how-to-raise-capital' },
      { divider: true },
      { title: 'Product' },
      { label: 'SAFEs', href: '/safe' },
      { divider: true },
      { title: 'Support' },
      { label: 'Help Docs', href: 'https://help.rollups.com/', external: true },
    ],
  },
]
