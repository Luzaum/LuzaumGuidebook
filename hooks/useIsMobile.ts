import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    setIsMobile(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', listener)
    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [breakpoint])

  return isMobile
}
