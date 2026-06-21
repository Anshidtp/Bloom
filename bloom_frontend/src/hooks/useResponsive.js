import { useState, useEffect } from 'react'

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 }

/**
 * useResponsive — returns current breakpoint flags.
 */
export function useResponsive() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    width,
    isMobile:  width < BREAKPOINTS.md,
    isTablet:  width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    isDesktop: width >= BREAKPOINTS.lg,
    isXL:      width >= BREAKPOINTS.xl,
  }
}
