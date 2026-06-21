import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore.js'
import CartItem from './CartItem.jsx'
import { formatINR } from '../../utils/priceCalculator.js'

export default function CartSidebar() {
  const { items, isCartOpen, closeCart, subtotal } = useCartStore()
  const total = subtotal()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-cocoa/30 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md z-[70] flex flex-col glass-card border-l border-white/30 shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30">
              <div>
                <h2 className="font-playfair text-xl font-semibold text-secondary">Your Selection</h2>
                <p className="text-xs text-cocoa/50 font-inter mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-cocoa/40 hover:text-secondary rounded-full hover:bg-secondary/10 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-6xl animate-float">🎂</span>
                  <p className="font-playfair text-lg text-secondary italic">Your basket is empty</p>
                  <p className="text-sm text-cocoa/50 font-inter">Design your first masterpiece</p>
                  <button onClick={closeCart} className="btn-primary mt-2">
                    <Link to="/custom-cake">Create a Cake</Link>
                  </button>
                </div>
              ) : (
                items.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-outline-variant/30 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm text-cocoa/60">Subtotal</span>
                  <span className="font-playfair text-lg font-semibold text-secondary">{formatINR(total)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-center text-sm text-cocoa/50 hover:text-secondary transition-colors font-inter">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
