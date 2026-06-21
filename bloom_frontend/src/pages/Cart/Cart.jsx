import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../components/animations/PageTransition.jsx'
import FadeUp         from '../../components/animations/FadeUp.jsx'
import CartItem       from '../../components/cart/CartItem.jsx'
import { useCartStore } from '../../store/cartStore.js'
import { formatINR }    from '../../utils/priceCalculator.js'

export default function Cart() {
  const { items, subtotal, clearCart } = useCartStore()
  const total = subtotal()
  const DELIVERY = total > 2000 ? 0 : 149

  return (
    <PageTransition>
      <div className="pt-28 pb-16 px-5 md:px-16 min-h-screen">
        <div className="container-max mx-auto">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="label-caps text-roseGold mb-1">Your Selection</p>
                <h1 className="heading-lg text-cocoa">Shopping Cart</h1>
              </div>
              {items.length > 0 && (
                <button onClick={clearCart} className="text-xs text-cocoa/40 hover:text-red-400 font-inter transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </FadeUp>

          {items.length === 0 ? (
            <FadeUp>
              <div className="text-center py-32">
                <span className="text-8xl animate-float block">🎂</span>
                <h2 className="font-playfair text-2xl text-secondary mt-6 mb-3">Your cart is empty</h2>
                <p className="text-cocoa/50 font-inter text-sm mb-8">Design your first masterpiece to get started</p>
                <Link to="/custom-cake" className="btn-primary">Create Your Cake</Link>
              </div>
            </FadeUp>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items list */}
              <div className="lg:col-span-7 space-y-4">
                <AnimatePresence>
                  {items.map((item) => <CartItem key={item.id} item={item} />)}
                </AnimatePresence>

                <FadeUp delay={0.2}>
                  <div className="pt-4 flex items-center gap-4">
                    <Link to="/custom-cake" className="btn-outline text-sm">
                      + Add Another Cake
                    </Link>
                    <Link to="/collections" className="text-sm text-cocoa/50 hover:text-secondary font-inter transition-colors">
                      Browse Collections
                    </Link>
                  </div>
                </FadeUp>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <FadeUp delay={0.15}>
                  <div className="glass-card rounded-3xl p-8 border border-outline-variant/20 shadow-chocolate">
                    <h2 className="font-playfair text-xl font-semibold text-secondary mb-6">Order Summary</h2>

                    <div className="space-y-3 pb-5 mb-5 border-b border-outline-variant/20">
                      <div className="flex justify-between text-sm font-inter text-cocoa/60">
                        <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                        <span className="font-medium text-cocoa">{formatINR(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-inter text-cocoa/60">
                        <span>Delivery</span>
                        <span className={`font-medium ${DELIVERY === 0 ? 'text-green-600' : 'text-cocoa'}`}>
                          {DELIVERY === 0 ? 'FREE' : formatINR(DELIVERY)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-inter text-cocoa/60">
                        <span>Luxury Packaging</span>
                        <span className="text-green-600 font-medium">FREE</span>
                      </div>
                    </div>

                    {DELIVERY > 0 && (
                      <div className="mb-5 p-3 bg-cream/60 rounded-xl border border-gold/20">
                        <p className="text-xs text-cocoa/60 font-inter">
                          🎁 Add <strong className="text-secondary">{formatINR(2000 - total)}</strong> more for free delivery!
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((total / 2000) * 100, 100)}%` }}
                            className="h-full gradient-rose rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                      <span className="label-caps text-cocoa/50">Total</span>
                      <span className="font-playfair text-2xl font-bold text-gradient-gold">
                        {formatINR(total + DELIVERY)}
                      </span>
                    </div>

                    <Link to="/checkout" className="btn-primary w-full text-center block">
                      Proceed to Checkout
                    </Link>

                    {/* Trust badges */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-outline-variant/20">
                      {[
                        { icon: '🔒', label: 'Secure Order' },
                        { icon: '✅', label: 'Fresh Baked'  },
                        { icon: '🚚', label: 'Fast Delivery' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1 text-center">
                          <span className="text-xl">{icon}</span>
                          <span className="text-[9px] font-inter font-semibold text-cocoa/40 uppercase tracking-wider">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
