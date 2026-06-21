import { motion } from 'framer-motion'
import { useCakeStore } from '../../store/cakeStore.js'
import { WEIGHTS } from '../../utils/constants.js'
import { formatINR } from '../../utils/priceCalculator.js'

export default function WeightSelector() {
  const { weight, setWeight } = useCakeStore()

  return (
    <div>
      <h3 className="label-caps text-roseGold mb-4">3. Weight & Size</h3>
      <div className="flex flex-wrap gap-2">
        {WEIGHTS.map((w) => {
          const isActive = weight === w.key
          return (
            <motion.button
              key={w.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setWeight(w.key)}
              className={`px-5 py-2.5 rounded-full border-2 font-inter font-semibold text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-secondary text-white border-secondary shadow-md'
                  : 'border-outline-variant text-cocoa/70 hover:border-secondary hover:text-secondary'
              }`}
            >
              {w.label}
              <span className={`ml-2 text-xs ${isActive ? 'text-white/80' : 'text-cocoa/40'}`}>
                {formatINR(w.price)}
              </span>
            </motion.button>
          )
        })}
      </div>
      <p className="text-xs text-cocoa/40 font-inter mt-3 italic">
        Weight affects tier count and overall size in the 3D preview.
      </p>
    </div>
  )
}
