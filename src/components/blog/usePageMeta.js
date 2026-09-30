import { useEffect } from 'react'

// Sets <title> and meta description per CLONE_SPEC_CONTENT.md "Page meta"; restores on unmount.
export default function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    const tag = document.querySelector('meta[name="description"]')
    const prevDesc = tag?.getAttribute('content')
    if (title) document.title = title
    if (tag && description) tag.setAttribute('content', description)
    return () => {
      document.title = prevTitle
      if (tag && prevDesc != null) tag.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
