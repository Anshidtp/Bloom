import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Modal — reusable overlay modal with glassmorphism panel.
 */
export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-cocoa/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className={`fixed inset-x-4 top-1/2 z-[101] -translate-y-1/2 glass-card rounded-3xl p-8 shadow-2xl mx-auto ${maxWidth}`}
            initial={{ opacity: 0, scale: 0.92, y: '-40%' }}
            animate={{ opacity: 1, scale: 1,    y: '-50%' }}
            exit={{   opacity: 0, scale: 0.92, y: '-40%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-start justify-between mb-6">
              {title && <h3 className="heading-md text-cocoa">{title}</h3>}
              <button
                onClick={onClose}
                className="ml-auto p-2 text-cocoa/40 hover:text-secondary rounded-full hover:bg-secondary/10 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
