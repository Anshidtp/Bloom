import { motion } from 'framer-motion'
import { useCartStore } from '../../store/cartStore.js'
import { formatINR } from '../../utils/priceCalculator.js'

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-outline-variant/20 shadow-sm"
    >
      {/* Cake emoji stand-in for image */}
      <div className="w-16 h-16 rounded-xl bg-cream flex items-center justify-center text-3xl flex-shrink-0 border border-outline-variant/20">
        🎂
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-playfair font-semibold text-secondary text-sm truncate">{item.name || `${item.flavor} Cake`}</p>
        <p className="text-xs text-cocoa/50 font-inter mt-0.5">
          {item.weight} · {item.design}
          {item.addOns?.length > 0 && ` · ${item.addOns.slice(0, 2).join(', ')}${item.addOns.length > 2 ? '…' : ''}`}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center gap-2 border border-outline-variant rounded-full overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-secondary hover:bg-secondary/10 transition-colors text-lg font-light"
            >−</button>
            <span className="text-xs font-semibold text-cocoa w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-secondary hover:bg-secondary/10 transition-colors text-lg font-light"
            >+</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-inter font-semibold text-sm text-secondary">
              {formatINR(item.totalPrice * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-cocoa/30 hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
