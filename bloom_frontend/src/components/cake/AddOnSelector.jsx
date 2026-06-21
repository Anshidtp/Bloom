import { motion } from 'framer-motion'
import { useCakeStore } from '../../store/cakeStore.js'
import { ADD_ONS } from '../../utils/constants.js'
import { formatINR } from '../../utils/priceCalculator.js'

export default function AddOnSelector() {
  const { addOns, toggleAddOn } = useCakeStore()

  return (
    <div>
      <h3 className="label-caps text-roseGold mb-4">4. Curated Add-ons</h3>
      <div className="space-y-2">
        {ADD_ONS.map((addon) => {
          const isOn = addOns.includes(addon.key)
          return (
            <motion.label
              key={addon.key}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                isOn
                  ? 'border-secondary/40 bg-secondary/5'
                  : 'border-outline-variant/40 bg-white/40 hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{addon.icon}</span>
                <div>
                  <p className="text-sm font-inter font-medium text-cocoa">{addon.label}</p>
                  <p className="text-xs text-roseGold font-inter">+{formatINR(addon.price)}</p>
                </div>
              </div>

              {/* Custom toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={() => toggleAddOn(addon.key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                  isOn ? 'bg-secondary' : 'bg-outline-variant'
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                  style={{ left: isOn ? '22px' : '2px' }}
                />
              </button>
            </motion.label>
          )
        })}
      </div>
    </div>
  )
}
