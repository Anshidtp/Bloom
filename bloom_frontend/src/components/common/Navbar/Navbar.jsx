import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../../store/cartStore.js'
import { useUiStore }  from '../../../store/uiStore.js'

const NAV_LINKS = [
  { to: '/',            label: 'Home'        },
  { to: '/collections', label: 'Collections' },
  { to: '/explore',     label: 'Explore'     },
  { to: '/custom-cake', label: 'Create Cake' },
  { to: '/contact',     label: 'Contact'     },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const { toggleCart, totalCount } = useCartStore()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore()
  const location = useLocation()
  const count    = totalCount()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { closeMobileMenu() }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card shadow-chocolate py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-max mx-auto px-5 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-playfair text-2xl font-bold text-secondary tracking-tight">
          Artisan <span className="text-roseGold italic">Bloom</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-inter text-sm font-medium transition-colors duration-300 relative group ${
                    isActive ? 'text-secondary' : 'text-cocoa/70 hover:text-secondary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-roseGold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Cart button */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-cocoa hover:text-secondary transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-roseGold text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {count}
              </motion.span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-cocoa hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-white/20"
          >
            <ul className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-inter text-sm font-medium transition-colors ${
                        isActive ? 'bg-secondary/10 text-secondary' : 'text-cocoa/80 hover:bg-secondary/5 hover:text-secondary'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
