import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Lenis from 'lenis'
import { router } from './routes/AppRouter.jsx'

export default function App() {
  // ── Lenis smooth scroll initialisation ───────────────
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <RouterProvider router={router} />
}