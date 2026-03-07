import { useEffect, useState } from 'react'

export function useResponsivePdf() {
  const [containerWidth, setContainerWidth] = useState(980)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setContainerWidth(width < 768 ? width - 32 : Math.min(width - 420, 980))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { containerWidth, isMobile }
}

