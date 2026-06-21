import { useEffect, useRef, useState } from 'react'

/**
 * useInView — returns a ref and whether the element is in the viewport.
 * @param {{ threshold?: number, once?: boolean }} options
 */
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref       = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}

/**
 * useCountUp — animates a number from 0 to `target` when triggered.
 */
export function useCountUp(target, duration = 800, trigger = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let start     = 0
    const step    = target / (duration / 16)
    const timer   = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, trigger])

  return value
}
