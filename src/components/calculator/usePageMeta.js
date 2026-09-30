import { useEffect } from 'react'

// Sets <title> and meta description per route (CLONE_SPEC_PRODUCTS.md "Page <title> and meta description")
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
}
