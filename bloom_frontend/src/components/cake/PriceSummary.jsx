import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCakeStore } from '../../store/cakeStore.js'
import { calculatePrice, formatINR } from '../../utils/priceCalculator.js'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)

  useEffect(() => {
    const from = prevRef.current
    const to   = value
    if (from === to) return
    const diff     = to - from
    const duration = 500
    const steps    = 30
    let   step     = 0
    const interval = setInterval(() => {
      step++
      setDisplay(Math.round(from + (diff * step) / steps))
      if (step >= steps) { setDisplay(to); clearInterval(interval) }
    }, duration / steps)
    prevRef.current = to
    return () => clearInterval(interval)
  }, [value])

  return <span>{formatINR(display)}</span>
}

export default function PriceSummary({ onAddToCart }) {
  const { flavor, weight, design, addOns } = useCakeStore()
  const { breakdown, total } = calculatePrice({ flavor, weight, design, addOns })

  return (
    <div className="glass-card rounded-2xl p-6 border border-outline-variant/30 shadow-gold">
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-playfair text-lg font-semibold text-secondary">Order Summary</h4>
        <AnimatePresence mode="wait">
          <motion.span
            key={total}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-xl font-bold text-roseGold"
          >
            <AnimatedNumber value={total} />
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Breakdown lines */}
      <div className="space-y-2 pb-4 mb-4 border-b border-outline-variant/20">
        {breakdown.map((line, i) => (
          <motion.div
            key={line.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between text-xs font-inter text-cocoa/60"
          >
            <span>{line.label}</span>
            <span className="font-medium text-cocoa/80">{formatINR(line.amount)}</span>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="label-caps text-cocoa/40">Total</span>
        <span className="font-playfair text-2xl font-bold text-gradient-gold">
          <AnimatedNumber value={total} />
        </span>
      </div>

      {/* Add to Cart */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAddToCart}
        className="w-full py-4 gradient-rose text-white font-inter font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        Add to Cart
      </motion.button>

      <p className="text-center text-[10px] text-cocoa/35 font-inter mt-3">
        Estimated delivery within 24–48 hours · Free luxury packaging
      </p>
    </div>
  )
}
