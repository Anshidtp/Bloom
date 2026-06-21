import { motion } from 'framer-motion'
import { useCakeStore } from '../../store/cakeStore.js'
import { FLAVORS } from '../../utils/constants.js'
import { formatINR } from '../../utils/priceCalculator.js'

export default function FlavorSelector() {
  const { flavor, setFlavor } = useCakeStore()

  return (
    <div>
      <h3 className="label-caps text-roseGold mb-4">1. Choose Flavor</h3>
      <div className="flex flex-wrap gap-3">
        {FLAVORS.map((f) => {
          const isActive = flavor === f.key
          return (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFlavor(f.key)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                isActive
                  ? 'border-secondary bg-secondary/5 shadow-md'
                  : 'border-outline-variant hover:border-secondary/50'
              }`}
              title={f.description}
            >
              <div
                className="w-10 h-10 rounded-full shadow-md ring-2 ring-offset-2 transition-all"
                style={{
                  backgroundColor: f.color,
                  border: `2px solid ${f.border}`,
                  ringColor: isActive ? '#795553' : 'transparent',
                }}
              />
              <span className="text-[10px] font-semibold font-inter text-cocoa/70 whitespace-nowrap">{f.label}</span>
              {f.price > 0 && (
                <span className="text-[9px] text-roseGold font-inter">+{formatINR(f.price)}</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
