import { motion } from 'framer-motion'
import { useCakeStore } from '../../store/cakeStore.js'
import { DESIGNS } from '../../utils/constants.js'
import { formatINR } from '../../utils/priceCalculator.js'

export default function DesignSelector() {
  const { design, setDesign } = useCakeStore()

  return (
    <div>
      <h3 className="label-caps text-roseGold mb-4">2. Design Style</h3>
      <div className="grid grid-cols-3 gap-2">
        {DESIGNS.map((d) => {
          const isActive = design === d.key
          return (
            <motion.button
              key={d.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDesign(d.key)}
              className={`py-3 px-2 rounded-xl border-2 text-center transition-all duration-300 ${
                isActive
                  ? 'border-secondary bg-secondary/8 text-secondary shadow-md'
                  : 'border-outline-variant text-cocoa/60 hover:border-secondary/50 hover:text-secondary'
              }`}
            >
              <span className="block text-xs font-semibold font-inter">{d.label}</span>
              {d.price > 0 && (
                <span className="block text-[9px] text-roseGold mt-0.5">+{formatINR(d.price)}</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
