import { useEffect } from 'react'

// Sets <title> and <meta name="description"> for a route and restores the previous values on unmount
export default function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    const prevDesc = tag.getAttribute('content')
    document.title = title
    tag.setAttribute('content', description)
    return () => {
      document.title = prevTitle
      if (prevDesc == null) tag.removeAttribute('content')
      else tag.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
