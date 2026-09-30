import { useEffect, useState } from 'react'

// true while window.innerWidth <= max (the original switches content in JS at innerWidth <= 767)
export default function useMaxWidth(max = 767) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.innerWidth <= max)
  useEffect(() => {
    const onResize = () => setMatch(window.innerWidth <= max)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [max])
  return match
}
